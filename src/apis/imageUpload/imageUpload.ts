import axios from 'axios';

const uploadImageToS3 = async (url: string, file: File): Promise<string> => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    if (response.status === 200) {
      // URL에서 파일의 S3 URL을 추출합니다.
      const s3Url = url.split('?')[0]; // Presigned URL의 쿼리 파라미터를 제거한 S3 URL
      return s3Url;
    } else {
      throw new Error('Failed to upload image to S3');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const imageUpload = async (file: File): Promise<string> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/images`,
      { name: file.name },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const presignedUrl = response.data.item.url;
    const s3Url = await uploadImageToS3(presignedUrl, file);
    return s3Url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default imageUpload;
