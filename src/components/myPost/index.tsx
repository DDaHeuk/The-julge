import MyPostInfo from '../myPostInfo';

const MyPost = () => {
  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[32px] lg:grid-cols-3">
      <MyPostInfo deadline={false} />
      <MyPostInfo deadline={false} />
      <MyPostInfo deadline={true} />
      <MyPostInfo deadline={true} />
      <MyPostInfo deadline={true} />
      <MyPostInfo deadline={true} />
    </div>
  );
};

export default MyPost;
