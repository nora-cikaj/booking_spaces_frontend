export const addEffectOnAreaHover = () => {
  const areas = document.getElementsByTagName('area');
  for (let index = 0; index < areas.length; index += 1) {
    areas[index].addEventListener(
      'mouseover',
      function () {
        this.focus();
      },
      false,
    );
    areas[index].addEventListener(
      'mouseout',
      function () {
        this.blur();
      },
      false,
    );
  }
};
