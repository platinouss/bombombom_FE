import { Suspense } from "react"
import StudyGroup from "./study-group"
import { Pageable, Study, StudyPage } from "./study"
import studies from "@/lib/api/study/studies"

const DEFAULT_SIZE = 6
export default async function StudyGrid({page,size}:Pageable){
    const studyPage:StudyPage = await studies({page, size: size??DEFAULT_SIZE})


    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            studyPage.contents.map((study:Study)=>{
              return (
                  <StudyGroup key={study.id} {...study} />
              )
            })
          }
        </div>)
}