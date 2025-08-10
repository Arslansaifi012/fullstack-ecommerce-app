
import upload from "../assets/upload.png"

const Add = () =>{
    return (
        <form className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2 text-2xl">upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img className="w-20" src={upload} alt="" />
                        <input className="" type="file" id="image1" hidden />
                    </label>

                      <label htmlFor="image2">
                        <img className="w-20" src={upload} alt="" />
                        <input className="" type="file" id="image2" hidden />
                    </label>

                      <label htmlFor="image3">
                        <img className="w-20" src={upload} alt="" />
                        <input className="" type="file" id="image3" hidden />
                    </label>

                      <label htmlFor="image4">
                        <img className="w-20" src={upload} alt="" />
                        <input className="" type="file" id="image4" hidden />
                    </label>

                </div>
            </div>

            <div>
                <p>Product Name</p>
                <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required/>
            </div>

        </form>
    )
} ;

export default Add ;