import { API_URL } from '../config/api';
// ── Enquiry (lead capture) ────────────────────────────────────────────────────
export const submitEnquiry = async (payload) => {
  const res = await fetch(`${API_URL}/api/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Submission failed');
  return data;
};

// ── Properties ────────────────────────────────────────────────────────────────
/**
 * Fetch properties from the backend.
 * @param {Object} params - Optional filters:
 *   type, city, minPrice, maxPrice, featured, search, sort, page, limit
 */
export const fetchProperties = async (params = {}, options = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.set(k, v);
  });
  query.set('_cb', Date.now());

  const res = await fetch(`${API_URL}/api/properties?${query.toString()}`, {
    credentials: 'include',
    ...options,
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch properties');
  return data; // { success, total, count, page, properties }
};

/**
 * Fetch dynamic property counts grouped by type and locality
 */
export const fetchPropertyCounts = async () => {
  const res = await fetch(`${API_URL}/api/properties/counts`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch counts');
  return data; // { success, typeCounts, localityCounts }
};

/**
 * Fetch a single property by its MongoDB _id.
 */
export const fetchPropertyById = async (id) => {
  const res = await fetch(`${API_URL}/api/properties/${id}`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Property not found');
  return data.property;
};

// ── AI Chat completions ───────────────────────────────────────────────────────
export const sendChatMessage = async (messages) => {
  const token = localStorage.getItem('hr_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Chatbot request failed');
  return data.reply;
};

// ── Blogs API ────────────────────────────────────────────────────────────────
export const fetchBlogs = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.set(k, v);
  });
  const res = await fetch(`${API_URL}/api/blogs?${query.toString()}`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch blogs');
  return data.blogs;
};

export const fetchBlogBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/api/blogs/${slug}`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Article not found');
  return data.blog;
};

// ── Partners ──────────────────────────────────────────────────────────────────
export const fetchPartners = async () => {
  const res = await fetch(`${API_URL}/api/partners`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch partners');
  return data.partners;
};

// ── Master Data ───────────────────────────────────────────────────────────────
export const fetchMasterData = async () => {
  const res = await fetch(`${API_URL}/api/master-data`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch master data');
  return data.data; // returns { locality: [], city: [], amenity: [], propertyType: [] }
};

// ── Advisors ──────────────────────────────────────────────────────────────────
export const fetchAdvisors = async () => {
  const res = await fetch(`${API_URL}/api/advisors`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch advisors');
  return data.advisors;
};

// ── Testimonials ──────────────────────────────────────────────────────────────
export const fetchTestimonials = async () => {
  const res = await fetch(`${API_URL}/api/testimonials`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch testimonials');
  return data.testimonials;
};

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const fetchFaqs = async () => {
  const res = await fetch(`${API_URL}/api/faqs`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch faqs');
  return data.faqs;
};


// ── User Listings (PostProperty wizard) ───────────────────────────────────────

/**
 * PHASE 1 — Lead Capture
 * Call when user clicks "Start Posting Your Ad For FREE".
 * Returns { success, isReturning, listing }
 *   isReturning=true  → user has a draft; resume from listing.currentStep
 *   isReturning=false → fresh draft created
 */
export const captureListingLead = async ({ name, phone, email, city, propertyType, adType }) => {
  const res = await fetch(`${API_URL}/api/user-listings/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ownerName: name, ownerPhone: phone, ownerEmail: email || '', city, propertyType, adType }),
  });
  return res.json();
};

/**
 * FORCE CREATE — Always creates a brand-new draft (never resumes existing)
 * Use this when user clicks "Post New Ad"
 */
export const createNewListing = async ({ name, phone, email, city, propertyType, adType }) => {
  const res = await fetch(`${API_URL}/api/user-listings/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ownerName: name, ownerPhone: phone, ownerEmail: email || '', city, propertyType, adType }),
  });
  return res.json();
};

/**
 * PHASE 2 — Auto-save a wizard step
 * Call on every "Save & Continue" before advancing.
 * phone = ownerPhone from leadForm (no JWT needed)
 */
// Whitelist — only these fields are accepted by the backend STEP_FIELDS
const STEP_FIELDS = new Set([
  'currentStep', 'completedSteps',
  'apartmentType', 'bhkType', 'ownershipType', 'floorType',
  'floor', 'totalFloor', 'propertyAge', 'facing',
  'area', 'carpetArea', 'furnishing',
  'pgRooms', 'roomType', 'tenantType',
  'commercialPropertyType', 'buildingType', 'otherFeatures',
  'plotLength', 'plotWidth', 'boundaryWall', 'cornerPlot',
  'floorsAllowed', 'gatedProject',
  'villaType', 'plotArea',
  'city', 'locality', 'society', 'flatNo', 'landmark',
  'price', 'deposit', 'pricePerSqft', 'maintenance', 'availableFrom',
  'preferredTenant', 'pgFood', 'pgGender', 'pgNotice', 'pgName',
  'loanAvailable', 'transactionType', 'underLoan',
  'balconies', 'bathrooms', 'parking', 'additionalNotes',
  'description', 'amenities', 'images', 'videos',
  'visitTime', 'visitDays', 'scheduleNotes',
]);

export const saveListingStep = async (listingId, stepIndex, data, phone) => {
  // Strip MongoDB/meta fields — only send whitelisted listing fields
  const clean = {};
  for (const [k, v] of Object.entries(data)) {
    if (STEP_FIELDS.has(k)) clean[k] = v;
  }

  const res = await fetch(`${API_URL}/api/user-listings/${listingId}/step`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ownerPhone: phone,
      currentStep: stepIndex,   // exact step user is ON
      completedSteps: Array.from({ length: stepIndex }, (_, i) => i), // steps before current
      ...clean,
    }),
  });
  return res.json();
};

/**
 * FINAL SUBMIT — change status from draft → submitted
 */
export const submitListing = async (listingId, phone) => {
  const res = await fetch(`${API_URL}/api/user-listings/${listingId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ownerPhone: phone }),
  });
  return res.json();
};

/**
 * GET MY LISTINGS — owner's drafts + submitted properties
 */
export const getMyListings = async (phone) => {
  const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

  const res = await fetch(
    `${API_URL}/api/user-listings/my/${cleanPhone}?confirm=${cleanPhone}`,
    {
      credentials: 'include',
    }
  );

  return res.json();
};
/**
 * REMOVE LISTING — owner deletes draft or listing
 */
export const removeListing = async (listingId, phone) => {
  const res = await fetch(`${API_URL}/api/user-listings/${listingId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ownerPhone: phone }),
  });
  return res.json();
};

/**
 * UPLOAD single file to R2
 * Returns { success, url, type }
 */
export const uploadFile = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const token = localStorage.getItem('hr_token');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: form,
  });
  return res.json();
};

/**
 * UPLOAD multiple files to R2
 */
export const uploadFiles = async (files) => {
  const form = new FormData();
  files.forEach(f => form.append('files', f));
  const token = localStorage.getItem('hr_token');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/upload/many`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: form,
  });
  return res.json();
};
