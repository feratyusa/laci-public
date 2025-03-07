import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    dialog: {
        styles:{
            base:{
                backgroundColor: 'bg-red-500'
            }
        }
    },

    plugins: [
        forms,
        require('@tailwindcss/typography'),
    ],
});
