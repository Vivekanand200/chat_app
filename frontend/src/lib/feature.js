import moment from "moment";

export const fileFormat = (url) => {
    const fileExtension = url.split(".").pop();
    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg")
        return "video";
    if (fileExtension === "mp3" || fileExtension === "wav")
        return "audio";
    if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif")
        return "image";
    return "file";

}
// /dpr_auto/w_200
export const transformImage = (url = "", width = 100) => {
    //const newUrl = url.replace("upload", `upload/dpr_auto/w_${width}/`);
    return url;
}

export const getLast7Days = () => {
    const currentDate = moment();
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
        const dayDate = currentDate.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd");
        last7Days.unshift(dayName);
    }
    return last7Days;
};

export const getOrSaveFromStorage = ({ key, value, get }) => {
    
    if (get) {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null && storedValue !== undefined && storedValue !== "undefined") {
            try {
                return JSON.parse(storedValue);
            } catch (e) {
                console.error(`Error parsing JSON from localStorage for key "${key}":`, e);
                return null;
            }
        }
        return null;
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
