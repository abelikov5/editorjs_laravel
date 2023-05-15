import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

export let editorConfig = {
    holder: 'editorjs',
    autofocus: true,

    tools: {
        header: Header,
        image: {
            // myOwnParagraph: myOwnParagraph,
            class: ImageTool,
            captionPlaceholder: 'title',
            config: {
                endpoints: {
                    byFile: '/api/uploadFile', // Your backend file uploader endpoint
                    // byUrl: '/fetchUrl', // Your endpoint that provides uploading by Url
                }
            }
        },
    },
    data: {},
    // onChange: function (api, event) {
    //     console.log('something changed', event);
    // },
};
