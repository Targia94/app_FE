import React, { useState, useEffect } from 'react';
import { Carousel, Image, Spin } from 'antd';
import { getImageUrls } from '@/libs/utils/fileChecker';

interface RenderImagesProps {
  codice: string;
}

const RenderImages: React.FC<RenderImagesProps> = ({ codice }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchImages = async () => {
        const urls = await getImageUrls(codice);
        setImageUrls(urls.length ? urls : ['/placeholder/product.webp']);
        setLoading(false);
      };
      fetchImages();
    }, [codice]);
  
    if (loading) {
      return <Spin />
    }
  
    return (
      <div style={{ width: 150, height: 'auto' }}>
        <Image.PreviewGroup>
          <Carousel arrows infinite={false}>
            {imageUrls.map((url, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  alt={`example ${index + 1}`}
                  width={'auto'}
                  height={150}
                  src={url}
                  fallback="/placeholder/product.webp"
                />
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
    );
};

export default RenderImages;
