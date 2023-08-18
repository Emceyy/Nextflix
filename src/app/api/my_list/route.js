import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const GET = async (request) => {

  const params = new URL(request.url).searchParams; 
  const useremail = params.get("useremail"); 


  try {
    await connect();

    const user = await User.findOne({ email: useremail }, "my_list"); 

if (user) {
  return new NextResponse(JSON.stringify(user.my_list), { status: 200 });
} else {
  return new NextResponse("User not found", { status: 404 });
}
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};



export const POST = async (request) => {
    
  const { useremail, movieId } = await request.json();


  try {
    await connect();

    
    const user = await User.findOneAndUpdate(
      { email:useremail },
      { $addToSet: { my_list: movieId } }, 
      { new: true }
    );

    
    if (user) {
      return new NextResponse("Movie has been added to your list", {
        status: 200,
      });
    } else {
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

  

  export const DELETE = async (request) => {
    
    const { useremail, movieId } = await request.json();
  
    try {
      await connect();
  
      
      const user = await User.findOneAndUpdate(
        { email:useremail },
        { $pull: { my_list: movieId } },
        { new: true }
      );
  
      
      if (user) {
        return new NextResponse("Movie has been removed from your list", {
          status: 200,
        });
      } else {
        return new NextResponse("User not found", { status: 404 });
      }
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
