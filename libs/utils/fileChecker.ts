export const checkFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getImageUrls = async (codice: string): Promise<string[]> => {
  const imageUrls: string[] = [];
  const extensions = ['jpg', 'jpeg'];

  for (const ext of extensions) {
    const baseImageUrl = `https://content.jbds.brainplatform.cloud/scan/${codice}.${ext}`;
    
    if (await checkFileExists(baseImageUrl)) {
      imageUrls.push(baseImageUrl);
    }

    for (let i = 1; i <= 5; i++) {
      const imageUrl = `https://content.jbds.brainplatform.cloud/scan/${codice}_${i}.${ext}`;
      if (await checkFileExists(imageUrl)) {
        imageUrls.push(imageUrl);
      }
    }
  }

  return imageUrls;
};

export const getPdfUrl = async (codice: string): Promise<string | null> => {
  const pdfUrl = `https://content.jbds.brainplatform.cloud/scan/${codice}.pdf`;
  return await checkFileExists(pdfUrl) ? pdfUrl : null;
};
