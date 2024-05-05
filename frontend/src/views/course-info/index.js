import Thumbnail from "./images/course_img.jpg"

const CourseInfo = () => {
  return (
    <div className="p-4">
      <div>
        <h3 className="text-3xl">Introduction to UI/UX</h3>
        <div className="flex gap-8 py-4">
          <p className="text-[#673ab7]">Steven Armos</p>
          <p>4.8 (23 ratings)</p>
        </div>
      </div>

      <div className="flex gap-4">
        <img src={Thumbnail} className=" w-2/3" />
        <div className="w-1/3 bg-white rounded shadow">
          <div className="flex flex-col gap-5 justify-center items-center mt-20">
            <div className="text-4xl">US$22.40</div>
            <div className="flex flex-col w-full gap-4">
              <button className="w-[80%] bg-[#673ab7] text-white mx-auto p-2 rounded-lg">
                Buy
              </button>
              <button className="w-[80%] outline outline-1 outline-[#673ab7] mx-auto p-2 rounded-lg text-[#673ab7]">
                Wishlist
              </button>
            </div>
          </div>
          <div className="ml-10 mt-10 flex flex-col gap-2">
            <p>4 sections</p>
            <p>20 lectures</p>
            <p>English</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-bold text-lg">About Course</h3>
        <p className="mt-4 text-gray-500">
          Vue (pronounced /vjuː/, like view) is a progressive framework for
          building user interfaces. Unlike other monolithic frameworks, Vue is
          designed from the ground up to be incrementally adoptable. The core
          library is focused on the view layer only, and is easy to pick up and
          integrate with other libraries or existing projects. On the other
          hand, Vue is also perfectly capable of powering sophisticated
          Single-Page Applications when used in combination with modern tooling
          and supporting libraries.
        </p>
      </div>
    </div>
  );
}

export default CourseInfo