export const uploadProfileImg = (profile_img: any): Promise<string> => {
    const config = {
        method: "POST",
        body: profile_img,
    };
    return new Promise(async (resolve, reject) => {
        const req = await fetch("http://localhost:2000/files/upload_profile_img", config);
        // check for api response status
        if (req.status === 200) {
            const reqData = await req.json() as {url: string};
            resolve(reqData.url)
        } else {
            reject("file upload error")
    }})
}