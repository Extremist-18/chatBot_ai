// import React from "react";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Logo = () => {
    return (
        <div style={{ 
            display: "flex", 
            marginRight: "auto", 
            alignItems: "center", 
            gap: "12px",
            cursor: "pointer" // Improves UX
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img 
                    src="/gpt1.png"  // Make sure this path is correct
                    alt="AI ChatBot Logo" 
                    width="30px" 
                    height="30px" 
                    className="image-inverted"
                    // style={{
                    //     transition: 'transform 0.3s ease',
                    //     ':hover': {
                    //         transform: 'scale(1.1)'
                    //     }
                    // }}
                />
                <Typography sx={{
                    display: { md: "block", sm: "none", xs: "none" },
                    fontWeight: "800",
                    textShadow: "2px 2px 20px #000",
                    color: "white", // Ensure text is visible
                    ml: 1 // Add some margin
                }}>
                    <span style={{ fontSize: "20px" }}>AI</span>-ChatBot
                </Typography>
            </Link>
        </div>
    );
};

export default Logo;

// import React from "react";
// import { Link } from 'react-router-dom';
// import Typography from '@mui/material/Typography';

// const Logo = () => {
//     return (
//         <div style={{ display: "flex", marginRight: "auto", alignItems: "center", gap: "12px" }}>
//             <Link to="/">
//                 <img 
//                     src="/gpt1.png"  // Updated path (assuming image is in `public/`)
//                     alt="robot1" 
//                     width="30px" 
//                     height="30px" 
//                     className="image-inverted" 
//                 />
//             </Link>
//             <Typography sx={{
//                 display: { md: "block", sm: "none", xs: "none" },
//                 mr: "auto",
//                 fontWeight: "800",
//                 textShadow: "2px 2px 20px #000",
//             }}>
//                 <span style={{ fontSize: "20px" }}>AI</span>-ChatBot
//             </Typography>
//         </div>
//     );
// };

// export default Logo;