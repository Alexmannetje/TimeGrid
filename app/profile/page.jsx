"use client";

import NavBar from "@/components/navbar";
import Modal from "@/components/modal";
import { Fragment, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <NavBar />
      <button onClick={toggleModal}>
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>

      </Modal>
    </Fragment>
  );
}