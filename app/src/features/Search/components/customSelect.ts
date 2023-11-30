import { RefObject } from 'react';
import styles from '../styles/sortDropdown.module.scss';

export function createCustomSelect(selectElement: RefObject<HTMLSelectElement> | null) {
  if(!selectElement?.current) return
  const selectedOptionCreated = document.getElementsByClassName(styles.selectSelected);
  if(selectedOptionCreated.length > 0) return;
  const selectedOption = document.createElement('DIV');
  selectedOption.classList.add(styles.selectSelected);
  selectedOption.innerHTML = selectElement.current.options[selectElement.current.selectedIndex]?.innerHTML;
  selectElement.current.parentNode?.appendChild(selectedOption);

  const optionsContainer = document.createElement('DIV');
  optionsContainer.classList.add(styles.selectItems, styles.selectHide);

  Array.from(selectElement.current.options).map(option => {
    const optionItem = document.createElement('DIV');
    optionItem.innerHTML = option.innerHTML;
    optionItem.setAttribute('id', option.value)
    optionsContainer.appendChild(optionItem);
  })

  selectElement.current.parentNode?.appendChild(optionsContainer);

  selectedOption.addEventListener('click', function (e) {
    e.stopPropagation();
    closeAllSelect(selectedOption);
    optionsContainer.classList.toggle(styles.selectHide);
    selectedOption.classList.toggle(styles.selectArrowActive);
  });
}



export const selectOption = (clickedOption: HTMLElement) => {
  const showSelectedDiv = document.getElementsByClassName(styles.selectSelected)[0];
  showSelectedDiv.innerHTML = clickedOption.innerHTML;
  const sameAsSelected = clickedOption.parentElement?.getElementsByClassName(styles.sameAsSelected);
  sameAsSelected && Array.from(sameAsSelected).map(elementSelected => elementSelected.removeAttribute('class'));
  clickedOption.setAttribute('class', styles.sameAsSelected);
}

export function closeAllSelect(excludeElement: ChildNode | null | undefined) {
  const selectItems = document.getElementsByClassName(styles.selectItems);
  const selectSelected = document.getElementsByClassName(styles.selectSelected);

  for (let i = 0; i < selectSelected.length; i++) {
    if (excludeElement !== selectSelected[i]) {
      selectSelected[i].classList.remove(styles.selectArrowActive);
    }
  }

  for (let i = 0; i < selectItems.length; i++) {
    if (excludeElement !== selectItems[i].previousSibling) {
      selectItems[i].classList.add(styles.selectHide);
    }
  }
}


