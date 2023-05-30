import Header from "@editorjs/header";

import MainScreen from './blocks/main-screen'
import SportDirection from './blocks/sport-direction'
import Schedule from './blocks/schedule'
import Gallery from './blocks/gallery'
import Discount from './blocks/discount'
import Form from './blocks/form'
import Metro from './blocks/metro'


export let editorConfig = {
    holder: 'editorjs',
    autofocus: true,

    tools: {
        mainScreen: {
            class: MainScreen,
        },
        metro: {
            class: Metro,
        },

        header: {
            class: Header,
            config: {
                levels: [1, 2, 3],
                defaultLevel: 2
            }
        },
        sportDirection: {
            class: SportDirection,
        },
        schedule: {
            class: Schedule,
        },
        gallery: {
            class: Gallery,
        },
        discount: {
            class: Discount,
        },
        form: {
            class: Form,
        }
    },
    data: {},
};
