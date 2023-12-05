import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: React.ReactNode | null;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null
  };

  constructor() {
    makeAutoObservable(this);
  }

  public openModal = (content: React.ReactNode) => {
    this.modal.open = true;
    this.modal.body = content;
  }

  public closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  }
}