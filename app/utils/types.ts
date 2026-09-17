export interface note{
    id?:number,
    title?:string,
    text:string,
}

export type PopupProps={

    note:note | null
    onGoback:()=> void
    onDelete : (id:number)=> void
   

}