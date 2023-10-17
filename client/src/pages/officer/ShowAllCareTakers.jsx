import React from 'react'
import TagLine from '../../components/TagLines/TagLine';
const ShowAllCareTakers = ({caretakersdata,caretakerdataloading}) => {
    return (
        <div className="mt-5">
          <TagLine heading={"Show All Care Takers"} />
          {/* {console.log(hostelsdata)} */}
          <table className="mt-5 w-full  text-center border-separate border-spacing-1 p-0 border border-slate-500 table-auto">
            <thead>
              <tr>
                <th className="hidden md:block border-4 border-black">ID:</th>
                <th className="border-4 border-black">Name:</th>
                <th className="hidden lg:block border-4 border-black">Address:</th>
                <th className="border-4 border-black">phoneNo:</th>
                <th className="border-4 border-black">email:</th>
                <th className="hidden md:block border-4 border-black ">gender:</th>
                <th className="border-4 border-black">hostel:</th>
              </tr>
            </thead>
            {caretakersdata && caretakersdata?.data?.length > 0 ? (
              <>
                <tbody>
                  {caretakersdata &&
                    caretakersdata?.data &&
                    caretakersdata?.data.map((val) => {
                      return (
                        <tr>
                          <td className="hidden md:block border-4 border-slate-600">{val._id}</td>
                          <td className="border-4 border-slate-600">{val.name}</td>
                          <td className="hidden lg:block border-4 border-slate-600">{val.address}</td>
                          <td className="border-4 border-slate-600">{val.phoneNo}</td>
                          <td className="border-4 border-slate-600">{val.email}</td>
                          <td className="hidden md:block border-4 border-slate-600">{val.gender}</td>
                          <td className="border-4 border-slate-600">{val.hostelAssign.hostel_name}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </>
            ) : (
              <>
              {caretakerdataloading && <h2 className="text-4xl text-center font-bold">Loading.....</h2>}
                
              </>
            )}
          </table>
        </div>
      );
}

export default ShowAllCareTakers