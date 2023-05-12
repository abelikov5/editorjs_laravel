import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

export let editorConfig = {
    holder: 'editorjs',
    tools: {
        header: Header,
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/api/uploadFile', // Your backend file uploader endpoint
                    // byUrl: '/fetchUrl', // Your endpoint that provides uploading by Url
                }
            }
        },
    },
    data: {},
    onChange: function (api, event) {
        console.log('something changed', event);
    },
};
