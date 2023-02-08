type Ioptions = {
  onClick: () => void;
  notMove?: boolean;
};

export default class ClickNormilize {
  private options: Ioptions;

  private readonly element?: HTMLElement;

  private startElement?: HTMLElement;

  private startY?: number;

  private startX?: number;

  private readonly onMouseDown: (e: MouseEvent) => void;

  private readonly onMouseUp: (e: MouseEvent) => void;

  constructor(element: HTMLElement, options: Ioptions) {
    this.element = element;
    this.options = options;

    this.startElement = undefined;
    this.startX = undefined;
    this.startY = undefined;

    this.onMouseDown = (e): void => {
      if (e.which !== 1) return;

      this.startElement = e.target as HTMLElement;

      this.startX = e.screenX;
      this.startY = e.screenY;
    };

    this.onMouseUp = (e): void => {
      if (e.which !== 1) return;

      if (this.options.notMove === true) {
        if (this.startX !== e.screenX || this.startY !== e.screenY) {
          this.reset();
          return;
        }
      }

      if (this.startElement !== e.target || this.startElement !== this.element) {
        this.reset();
        return;
      }

      this.options.onClick();
      this.reset();
    };

    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseup', this.onMouseUp);
  }

  reset(): void {
    this.startElement = undefined;
    this.startX = undefined;
    this.startY = undefined;
  }

  destroy(): void {
    if (this.element) {
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mouseup', this.onMouseUp);
    }
  }
}
