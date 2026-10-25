import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

export default function LottieIcon({ url, animationData, loop = true, autoplay = true, className = '', style = {} }) {
  const [data, setData] = useState(animationData || null);

  useEffect(() => {
    if (animationData) {
      setData(animationData);
      return;
    }

    if (!url) return;

    let active = true;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err) => console.error('Failed to load lottie json:', err));

    return () => {
      active = false;
    };
  }, [url, animationData]);

  if (!data) return null;

  return (
    <div className={className} style={{ width: 40, height: 40, ...style }}>
      <Lottie animationData={data} loop={loop} autoplay={autoplay} />
    </div>
  );
}
