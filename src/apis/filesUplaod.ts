export const uploadProfileImg = async (profile_img: any) => {
    const config = {
        method: "POST",
        body: profile_img,
    };
    const req = await fetch("http://localhost:2000/files/upload_profile_img", config)
    const reqData = await req.json();
    return reqData
}