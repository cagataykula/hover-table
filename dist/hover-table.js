function hoverTable(selector = 'table td', {
  primaryClass = 'primary-hover',
  secondaryClass = 'secondary-hover',
  includeTableHead = false
}) {
  const tdElement = document.querySelectorAll(selector)
  
  function addClassToPrevRows(item) {
    item.classList.add(secondaryClass)
    if(item.previousElementSibling) {
      addClassToPrevRows(item.previousElementSibling)
    }
  }
  
  function addClassToPrevColumnsRow(item, index) {
    if(item.childElementCount >= index) {
      item.children[index].classList.add(secondaryClass)
    }
    if(item.previousElementSibling) {
      addClassToPrevColumnsRow(item.previousElementSibling, index)
    } else {
      if(includeTableHead) {
        Object.values(item.parentElement.previousElementSibling.children).forEach(headTrItem => {
          if(item.childElementCount >= index) {
            headTrItem.children[index].classList.add(secondaryClass)
          }
        })
      }
    }
  }

  function removeClassToPrevRows(item) {
    item.classList.remove(secondaryClass)
    if(item.previousElementSibling) {
      removeClassToPrevRows(item.previousElementSibling)
    }
  }
  
  function removeClassToPrevColumnsRow(item, index) {
    if(item.childElementCount >= index) {
      item.children[index].classList.remove(secondaryClass)
    }
    if(item.previousElementSibling) {
      removeClassToPrevColumnsRow(item.previousElementSibling, index)
    } else {
      if(includeTableHead) {
        Object.values(item.parentElement.previousElementSibling.children).forEach(headTrItem => {
          if(item.childElementCount >= index) {
            headTrItem.children[index].classList.remove(secondaryClass)
          }
        })
      }
    }
  }
  
  
  tdElement.forEach((tdItem, index) => {
    const rowIndex = Array.from(tdItem.parentElement.children).indexOf(tdItem)
    //self background color
    tdItem.addEventListener('mouseenter', function () {
      tdItem.classList.add(primaryClass)
      if(tdItem.previousElementSibling) addClassToPrevRows(tdItem.previousElementSibling)
      if(tdItem.parentElement.previousElementSibling) addClassToPrevColumnsRow(tdItem.parentElement.previousElementSibling, rowIndex)
    })
    
    tdItem.addEventListener('mouseleave', function () {
      tdItem.classList.remove(primaryClass)
      if(tdItem.previousElementSibling) removeClassToPrevRows(tdItem.previousElementSibling)
      if(tdItem.parentElement.previousElementSibling) removeClassToPrevColumnsRow(tdItem.parentElement.previousElementSibling, rowIndex)
    })
  })

}