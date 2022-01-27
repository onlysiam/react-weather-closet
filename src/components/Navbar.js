import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
//styled
import styled from "styled-components";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 260px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Navbar = ({ setAuthenticated }) => {
  const [displayvis, setdisplayvis] = useState();
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setdisplayvis(true);
      }, 400);
    } else {
      setdisplayvis(false);
    }
  });

  return (
    <Body
      display={displayvis ? "none" : "visible"}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation setAuthenticated={setAuthenticated} />
      <MenuToggle toggle={() => toggleOpen()} />
    </Body>
  );
};

const Body = styled(motion.nav)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 300px;
    background-color: #237e83;
    z-index: 10;
    display: ${(props) => props.display};
  }
`;
