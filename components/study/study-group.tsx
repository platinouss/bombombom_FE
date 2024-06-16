
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { BookIcon, CalendarIcon, CoinsIcon, PuzzleIcon, ShieldIcon, UsersIcon } from "./icon";
import { AlgorithmStudy, BookStudy, Study } from "./study";

enum Tier {
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
  RUBY
}
const bgColorClass:Record<string,string> ={
  [Tier.BRONZE]:"bg-yellow-700",
  [Tier.SILVER]:"bg-slate-500",
  [Tier.GOLD]:"bg-yellow-500",
  [Tier.PLATINUM]:"bg-green-500",
  [Tier.DIAMOND]:"bg-cyan-500",
  [Tier.RUBY]:"bg-rose-500",
}

const MAX_LEVEL = 29

function TierBadge({difficultyLevel}:{difficultyLevel:number}){
  difficultyLevel = Math.min(difficultyLevel, MAX_LEVEL)
  const tierIndex = Math.floor(difficultyLevel/5)
  const tier:string = Tier[tierIndex]
  const bgColor=bgColorClass[tierIndex]
  
  return (
    <div className={`${bgColor} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
      {`${tier.charAt(0)+tier.substring(1).toLowerCase()} ${5-difficultyLevel%5}`}
    </div>
  )
}

function AlgorithmStudyInfo(algorithmStudy:AlgorithmStudy){
  const as = algorithmStudy;
  let difficultyAvg = as.difficulty_dp+as.difficulty_ds +as.difficulty_geometry+as.difficulty_graph+as.difficulty_greedy+as.difficulty_impl+as.difficulty_math+as.difficulty_string
  difficultyAvg/=8
  const difficultyBegin = Math.round(difficultyAvg)
  const difficultyEnd= difficultyBegin+as.difficulty_gap
  return (
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 mb-4">
        <ShieldIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
       <TierBadge difficultyLevel={difficultyBegin} />
        <span className="text-gray-600 dark:text-gray-400"> - </span>
        <TierBadge difficultyLevel={difficultyEnd} />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <PuzzleIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">{algorithmStudy.problem_count}개</span>
        
      </div>
    </div>
  )
}

function BookStudyInfo(bookStudy:BookStudy){
  return (
    <div className="flex items-center gap-2 mb-4">
        <BookIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">{bookStudy.book_id} (TODO: 책제목으로 변경)</p>
    </div>
  )
}
function addDays(date:Date, days:number):Date {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function getPeriod(start_date:string, weeks:number):string{
  const date = new Date(start_date) 
  const end_date = addDays(date,7*weeks)
  return `${date.getMonth()+1}월 ${date.getDate()}일 - ${end_date.getMonth()+1}월 ${end_date.getDate()}일`
}

export default async function StudyGroup(study:Study){

    return (
        <Link
          className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          href="#"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{study.name}</h2>
              <div className="flex items-center">
                <UsersIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{study.head_count} / {study.capacity}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <CoinsIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{study.penalty}원</span>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{getPeriod(study.start_date,study.weeks)}</span>
              </div>
            </div>
            {
              study.study_type =="BOOK"?
                <BookStudyInfo {...study as BookStudy}/>
                :<AlgorithmStudyInfo {...study as AlgorithmStudy}/>
            }
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {study.introduce.length>200?(study.introduce.substring(0,200)+'...'):study.introduce }
            </p>
          </div>
        </Link>
    )
}

