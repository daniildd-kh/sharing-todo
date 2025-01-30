import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./Accordion.module.scss";

interface AccordionProps {
  children: ReactNode;
  isOpen: boolean;
}

const Accordion = ({ children, isOpen }: AccordionProps) => {
  if (!isOpen) {
    return null;
  }

  return <div className={style.accordion}>{children}</div>;
};

interface AccordionWithTriggerProps {
  trigger: ReactNode;
  children: ReactNode;
}

const AccordionWithTrigger = ({
  trigger,
  children,
}: AccordionWithTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      accordionRef.current &&
      !accordionRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className={style.trigger}>
      <div onClick={toggleAccordion}>{trigger}</div>
      <div ref={accordionRef}>
        <Accordion isOpen={isOpen}>{children}</Accordion>
      </div>
    </div>
  );
};

export default AccordionWithTrigger;
