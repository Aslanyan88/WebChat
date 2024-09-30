import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const upload = async (file) => {
    const metadata = {
        contentType: 'image/jpeg'
    };
    const date = new Date();
    const storageRef = ref(storage, `image/${date + file.name}}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject("Something whent wrong" + error.code)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve('File available at', downloadURL);
                });
            }
        );

    });
}
export default upload;