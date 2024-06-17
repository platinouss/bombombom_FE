export interface Study{
    id:number,
    name:string,
    introduce:string,
    headCount:number,
    capacity:number,
    weeks:number,
    startDate:string,
    reliabilityLimit:number,
    penalty:number,
    state:string,
    studyType:string
}

export interface AlgorithmStudy extends Study{
    difficultyMath:number,

    difficultyDp:number,

    difficultyGreedy:number,

    difficultyImpl:number,

    difficultyGraph:number,

    difficultyGeometry:number,

    difficultyDs:number,

    difficultyString:number,

    difficultyGap:number,

    problemCount:number
}

export interface BookStudy extends Study{
    bookId:number
}

export interface Pageable{
    page:number,
    size:number
  }

export interface StudyPage {
    totalElements: number,
    totalPages:number,
    pageNumber:number,
    contents: Study[]
}
