import { parse } from 'node-html-parser';

const convertDataJsonService = {
  execute: ( data: any ) => {
    const elements = JSON.parse(JSON.stringify(data));

    const aElements = new Array();

    for (let i = 0; i < elements.length; i++) {
      const block = elements[i];
      let sValue = block.value != '' ? block.value : block.attributes.content;
      if (
        (block.value != '' || block.attributes.content != '') &&
        block.type != 'core/image' &&
        block.type != 'core/columns'
      ) {
        let sType;

        if (block.type == 'lazyblock/cta-text') {
          sType = block.attributes.type;
        } else {
          sValue = block.value.replace(/(<figure).+?>/, '').replace('</figure>', '');
          // retorna o nome da tag - exemplo <h1> retorna h1
          sType = sValue.match(/^<(\w+)>/)[1];
        }

        try {
          switch (sType) {
            case 'ol':
            case 'ul':
              const list = parse(sValue);
              const result = convertDataJsonService.getData(list.childNodes[0]);
              aElements.push({
                type: sType,
                items: result,
              });
              break;

            default:
              // remove as tags html
              if (sType != 'table') {
                sValue = sValue.replace(/<[^>]*>?/gm, '');
              }
              if (sType != 'table') {
                const aSentences = sValue
                  .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<![0-9]\.)(?<=\.|\?)(\s|[A-Z].*)/)
                  .filter((c: any) => c !== ' ');
                aElements.push({
                  type: sType,
                  value: sValue,
                  sentences: aSentences,
                });
              } else {
                aElements.push({
                  type: sType,
                  value: sValue,
                });
              }
              break;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return aElements;
  },

  getData: (el: any) => {
    var aList = new Array();
    for (const child of el.childNodes) {
      const aSentences: string[] = child.text
        .split(/(?<=[^A-Z].[.?]) +(?=[A-Z])/)
        .filter((c: any) => c !== ' ');

      aList.push({
        value: child.text,
        sentences: aSentences,
      });
    }
    return aList;
  }
  
};

export default convertDataJsonService;
