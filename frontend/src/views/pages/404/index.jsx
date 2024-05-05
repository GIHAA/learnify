import image404 from './image/404.svg'

const PageNotFound = () => {
  return (
    <section className='bg-white rounded-[12px] flex justify-center'>
    <section className='lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] md:py-[60px]  lg:py-[90px] flex justify-center flex-col gap-[34px]'>
      <img src={image404} alt='404' className='' />
      <div className='max-w-[557px] mx-auto clex flex-col gap-[15px] '>
        <h3 className='text-[34px] leading-[40px] font-semibold text-center'>Something Went Wrong</h3>
        <p className='text-[16px] leading-[24px] font-semibold text-center'>The page you are looking for might have been removed or is temporarily unavailable.</p>
      </div>
   </section>
   </section>
  );
};

export default PageNotFound;