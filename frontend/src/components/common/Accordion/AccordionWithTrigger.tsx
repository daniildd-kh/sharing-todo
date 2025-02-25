import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import style from "./Accordion.module.scss";
import clsx from "clsx";

interface AccordionProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
}

const Accordion = ({ children, isOpen, className }: AccordionProps) => {
  if (!isOpen) {
    return null;
  }

  return <div className={clsx(style.accordion, className)}>{children}</div>;
};

interface AccordionWithTriggerProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

const AccordionWithTrigger = ({
  trigger,
  children,
  className,
}: AccordionWithTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      accordionRef.current &&
      !accordionRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

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
        <Accordion isOpen={isOpen} className={className}>
          {children}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionWithTrigger;
