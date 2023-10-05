import React from "react";
import { images } from "../../../constants";
import DiagonalBorder from "../../../components/DiagonalShape/DiagonalBorder";
const AboutUs = () => {
  return (
    <section className="container mx-auto flex flex-col">
      <div className="mx-auto mt-10 flex flex-col justify-center items-center h-1/2 gap-y-5">
        <h2 className="font-bold  text-3xl border-b-4 text-teal-700 md:hover:scale-150">
          About Us
        </h2>

        <p className="leading-loose text-xl text-center  hover:text-sky-800 hover:font-semibold">
          Welcome to Hostel Issue Tracker Portal, where we are dedicated to
          making hostel life more convenient and enjoyable for students.
        </p>
      </div>

      <div className="mx-auto mt-10 flex flex-col justify-center items-center h-1/2 w-4/5 gap-y-5 sm:mt-5">
        <h2 className="font-bold  text-teal-700 text-3xl border-b-4 md:hover:scale-150">
          Our Mission
        </h2>

        <p className="leading-relaxed text-xl text-center hover:text-sky-800 hover:font-semibold">
          At Hostel Issue Tracker Portal, our mission is to enhance the overall
          hostel experience by simplifying the process of lodging complaints and
          addressing hostel-related issues. We believe that students should have
          the freedom to focus on their studies and personal growth without the
          unnecessary hassles of complaint registration.
        </p>
      </div>
      <hr className="m-10" />
      <div className="flex-flex-col  gap-4">
        <div className="flex flex-row justify-between gap-x-9 items-center">
          <div className="w-1/2 ml-3 hidden lg:block  ">
            <img
              src={images.marco_hostel}
              alt="hostel1"
              className="object-cover h-1/2 w-full rounded-t-full hover:opacity-60"
            />
          </div>
          <div className="flex flex-row lg:flex-col justify-center w-full lg:w-1/2 items-end">
            <div className="hidden md:w-3/2 lg:flex ">
              <img src={images.semi1} alt="semicolon" className="w-1/4" />
              <img src={images.semi1} alt="semicolon" className="w-1/4" />
            </div>

            <div>
              <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl text-dark-soft text-center lg:text-left">
                Why this?
              </h2>

              <ul className="flex flex-col justify-center  gap-y-8  md:p-0 p-4">
                <li className="mt-5">
                  <b>Focus on Student Well-being:</b> The content highlights
                  that your platform is designed to improve the well-being of
                  students in hostels, aligning with their academic and personal
                  growth goals.
                </li>

                <li className="mt-5">
                  <b>Simplification and Efficiency:</b> You emphasize your
                  commitment to simplifying the complaint management process,
                  making it easy and efficient for students to report issues.
                </li>

                <li className="mt-5">
                  <b>Transparency:</b> Mentioning transparency is important, as
                  it assures users that the process is fair and accountable.
                </li>

                <li className="mt-5">
                  <b>Time Management:</b> The content underscores the value of
                  time management, suggesting that students can focus more on
                  their studies and other activities by using your platform.
                </li>

                <li className="mt-5">
                  <b>Positive Outcome:</b> It concludes on a positive note,
                  expressing the desire to create a better hostel experience and
                  improve students' overall quality of life.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* second */}

        <div className="flex  justify-between items-center flex-row-reverse">
          <div className="w-1/2  ml-3 hidden lg:block">
            <img
              src={images.darwin_hostel}
              alt="hostel1"
              className="object-cover h-1/2 w-full rounded-b-full hover:opacity-60"
            />
          </div>
          <div className="flex flex-row lg:flex-col justify-center w-full lg:w-1/2 items-end">
            <div className="hidden md:w-3/2 lg:flex ">
              <img src={images.semi2} alt="semicolon" className="w-1/4" />
              <img src={images.semi2} alt="semicolon" className="w-1/4" />
            </div>

            <div>
              <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl text-dark-soft text-center lg:text-left">
                What we Offer ?
              </h2>

              <ul className="flex flex-col justify-center mt-10 gap-y-8 md:p-0 p-4">
                <li className="mt-5">
                  <b>Efficiency:</b> With our platform, you can easily submit
                  and track complaints in real-time, ensuring quick resolutions.
                </li>

                <li className="mt-5">
                  <b>Continuous Improvement:</b> We are committed to ongoing
                  improvements and updates to provide you with the best possible
                  experience.
                </li>

                <li className="mt-5">
                  <b>Support:</b> Our dedicated support team is here to assist
                  you and address any queries or concerns you may have.
                </li>

                {/* <li className="mt-5">
                  <b>Time Management:</b> The content underscores the value of
                  time management, suggesting that students can focus more on
                  their studies and other activities by using your platform.
                </li>

                <li className="mt-5">
                  <b>Positive Outcome:</b> It concludes on a positive note,
                  expressing the desire to create a better hostel experience and
                  improve students' overall quality of life.
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 w-full  gap-y-20 group justify-center items-center">
        <DiagonalBorder header={"Join Us"} />
        <p className="p-6 md:p-4 lg:p-2 leading-10 text-center group-hover:text-black-200 group-hover:text-2xl group-hover:leading-loose">
          We invite you to join our mission to transform hostel life into a
          stress-free and enjoyable experience. Your feedback, suggestions, and
          active participation are invaluable in helping us achieve our goals.
          Thank you for choosing Hostel Issue Tracker Website as your
          partner in creating a better hostel environment. Together, we can
          build a brighter future for students. For any inquiries or feedback,
          please feel free to contact us at +12345679.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
