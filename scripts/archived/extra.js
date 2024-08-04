module.exports = {
	IonSplitPane: `const QUERY: { [key: string]: string } = {
        xs: '(min-width: 0px)',
        sm: '(min-width: 576px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 992px)',
        xl: '(min-width: 1200px)',
        never: '',
      };`,

	IonSearchbar: `
      import { config } from '@ionic/core'
      import { arrowBackSharp, closeCircle, closeSharp, searchOutline, searchSharp } from 'ionicons/icons';
      `,

	IonInput: `
      import { createEventDispatcher } from "svelte";
      const dispatch=createEventDispatcher()  
      const ionChange= (event)=>{
         value=event.detail.value;
          dispatch("ionChange", event.detail);
       }
      `,

	IonTextarea: `
      import { createEventDispatcher } from "svelte";
      const dispatch=createEventDispatcher()  
      const ionChange= (event)=>{
         value=event.detail.value;
          dispatch("ionChange", event.detail);
       }
      `,

	IonSelect: `
      import { createEventDispatcher } from "svelte";
      const dispatch=createEventDispatcher()  
      const ionChange= (event)=>{
         value=event.detail.value;
          dispatch("ionChange", event.detail);
       }
      `,

	IonCheckbox: `
          import { createEventDispatcher } from "svelte";
          const dispatch=createEventDispatcher()  
          const ionChange= (event)=>{
             value=event.detail.value;
             checked=event.detail.checked;
              dispatch("ionChange", event.detail);
           }
          `,

	IonDatetime: `
                import { createEventDispatcher } from "svelte";
                const dispatch=createEventDispatcher()  
                const ionChange= (event)=>{
                   value=event.detail.value;
                    dispatch("ionChange", event.detail);
                 }
                `,
	IonRange: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        }
        `,
	IonRadioGroup: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        }
        `,

	IonSearchbar: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        } 
        `,

	IonSegment: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        }
        `,

	IonSelect: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        }
        `,

	IonToggle: `
        import { createEventDispatcher } from "svelte";
        const dispatch=createEventDispatcher()  
        const ionChange= (event)=>{
        value=event.detail.value;
            dispatch("ionChange", event.detail);
        }
        `,

	IonItem: `
        import { chevronForward } from 'ionicons/icons';
        `
};
