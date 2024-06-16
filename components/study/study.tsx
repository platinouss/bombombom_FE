export interface Study{
    id:number,
    name:string,
    introduce:string,
    head_count:number,
    capacity:number,
    weeks:number,
    start_date:string,
    reliability_limit:number,
    penalty:number,
    state:string,
    study_type:string
}

export interface AlgorithmStudy extends Study{
    difficulty_math:number,

    difficulty_dp:number,

    difficulty_greedy:number,

    difficulty_impl:number,

    difficulty_graph:number,

    difficulty_geometry:number,

    difficulty_ds:number,

    difficulty_string:number,

    difficulty_gap:number,

    problem_count:number
}

export interface BookStudy extends Study{
    book_id:number
}
export interface Pageable{
    page:number,
    size:number
  }