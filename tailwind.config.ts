import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'100': '#FFF1E6',
  				'500': '#FF7000'
  			},
  			dark: {
  				'100': '#000000',
  				'200': '#0F1117',
  				'300': '#151821',
  				'400': '#212734',
  				'500': '#101012'
  			},
  			light: {
  				'400': '#858EAD',
  				'500': '#7B8EC8',
  				'700': '#DCE3F1',
  				'800': '#F4F6F8',
  				'850': '#FDFDFD',
  				'900': '#FFFFFF'
  			},
  			'accent-blue': '#1DA1F2'
  		},
  		fontFamily: {
  			inter: ["var(--font-inter)"],
  			lexend: ["var(--font-lexend)"],
  			poppins: ["var(--font-poppins)"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
