import { Message } from "element-ui";
export default function (data) {
    // console.log(data);
    data.$axios.onError(err => {
        // console.log(err.response);
        const { statusCode, message } = err.response.data
        if (statusCode === 400) {
            Message.warning(message);
        }
    })
}