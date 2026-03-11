import React, { useState } from 'react';

const quizData = [
  { q: "LOL", a: "웃음이 터졌어 / 너무 웃겨", options: ["오늘 처음 알았어", "웃음이 터졌어 / 너무 웃겨", "곧 도착해", "솔직히 말하면"] },
  { q: "LMAO", a: "엄청 크게 웃는 중", options: ["엄청 크게 웃는 중", "내가 느끼기엔", "나중에 얘기하자", "일단 집에 가는 중"] },
  { q: "BRB", a: "금방 돌아올게", options: ["진짜로", "금방 돌아올게", "전혀 몰라", "쪽지 보내줘"] },
  { q: "IDK", a: "나도 몰라", options: ["상관없어", "나도 몰라", "좋은 생각이 아니야", "네 말이 맞아"] },
  { q: "TBH", a: "솔직히 말하면", options: ["솔직히 말하면", "내 의견으로는", "얼른 와", "이미 봤다면"] },
  { q: "SMH", a: "어이없어서 고개를 젓는 반응", options: ["정말 진지하게", "어이없어서 고개를 젓는 반응", "잠깐만 기다려", "네가 괜찮은지 묻는 말"] },
  { q: "JK", a: "농담이야", options: ["조심해", "농담이야", "바로 알림 켜", "그건 비밀이야"] },
  { q: "OMW", a: "가는 중이야", options: ["나도 그렇게 생각해", "가는 중이야", "조금 뒤에 와", "지금 일하는 중"] },
  { q: "ICYMI", a: "혹시 못 봤을까 봐", options: ["위험할 수 있으니 조심", "혹시 못 봤을까 봐", "현실에서", "네가 원한다면"] },
  { q: "POV", a: "~의 시점 / 관점", options: ["네가 알면 아는 거야", "~의 시점 / 관점", "오늘 배운 사실", "사람들"] },
  { q: "ILY", a: "사랑해", options: ["보고 싶어", "사랑해", "네가 옳아", "좋은 하루 보내"] },
  { q: "BFF", a: "베스트 프렌드", options: ["정말 웃겨", "베스트 프렌드", "일하느라 바쁨", "잘 지내"] },
  { q: "LMK", a: "알려줘", options: ["알려줘", "조용히 해", "한 번 더 말해줘", "오해하지 마"] },
  { q: "TIL", a: "오늘 새롭게 알게 된 것", options: ["오늘 새롭게 알게 된 것", "지금 출발함", "그건 아니고", "조심해서 봐"] },
  { q: "WTF", a: "이게 뭐야 / 어이없다", options: ["이게 뭐야 / 어이없다", "너무 피곤해", "할 말이 없어", "일단 읽어봐"] },
  { q: "IMO", a: "내 생각에는", options: ["분명히 그렇지", "내 생각에는", "문자 봐줘", "전화 줘"] },
  { q: "IMHO", a: "겸손하게 말하자면 내 생각에는", options: ["다음에 하자", "겸손하게 말하자면 내 생각에는", "집중해", "절대 안 돼"] },
  { q: "TTYL", a: "나중에 또 얘기하자", options: ["완전 동의해", "나중에 또 얘기하자", "먼저 잘게", "오늘도 같은 하루"] },
  { q: "AFK", a: "자리 비움", options: ["진짜 재밌음", "자리 비움", "메신저 확인해", "현실 친구"] },
  { q: "NGL", a: "솔직히 말해서", options: ["솔직히 말해서", "기분이 안 좋아", "보지 마", "무시해"] }
];

function shuffle(arr: string[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userType, setUserType] = useState<'internal' | 'external' | null>(null);
  const [screen, setScreen] = useState<'quiz' | 'entry' | 'result'>('quiz');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [shuffledQuizData, setShuffledQuizData] = useState(() => 
    quizData.map(item => ({ ...item, shuffledOptions: shuffle(item.options) }))
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setUserType(null);
    setScreen('quiz');
    setIsModalOpen(false);
    setSelectedOption(null);
    setShuffledQuizData(quizData.map(item => ({ ...item, shuffledOptions: shuffle(item.options) })));
  };

  const handleSelectAnswer = (option: string, correct: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(option);
    if (option === correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setScreen('entry');
    }
  };

  const handleUserType = (type: 'internal' | 'external') => {
    setUserType(type);
    setScreen('result');
  };

  const getResultContent = () => {
    if (score >= 0 && score <= 5) {
      return {
        headline: '아직 원어민 문화 적응 전?!',
        message: '당신은 이번에 꼭!\nSteve 선생님 특강을 들으셔야 합니다.\n모르는 Acronym을 알아갈 시간!.'
      };
    } else if (score >= 6 && score <= 13) {
      return {
        headline: '꽤 아시는데요? 하지만 아직 레벨업 가능!',
        message: '이 정도면 꽤 아는 편이기는 하지만...\n원어민 문화에 동화되고 싶다면?\nSteve 선생님 특강을 들어보시는 게 좋겠죠'
      };
    } else if (score >= 14 && score <= 18) {
      return {
        headline: '헉, 거의 준원어민급!',
        message: '헉! 이미 원어민 문화에 익숙한 당신은...\n준원어민 실력을 가지셨군요?\n마지막 남은 부분을 채울 Steve 선생님 특강 들어보시는 건 어때요?'
      };
    } else {
      return {
        headline: '원어민 그 잡 채!',
        message: '이 약어들에 숨겨진 의미나,\n사용법을 알고 싶지는 않나요?\n조금 더 살아있는 예문이 궁금하시다면\nYou don\'t want to miss the special lecture!'
      };
    }
  };

  const item = shuffledQuizData[currentIndex];

  return (
    <div className="w-[min(420px,calc(100vw-24px))] md:w-[min(760px,calc(100vw-36px))] lg:w-[760px] bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[28px] shadow-[0_20px_50px_rgba(31,41,55,0.12)] overflow-hidden border border-white/80 mx-auto flex-none">
      <section className="px-4 py-5 md:px-7 md:pt-11 md:pb-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-orange-500 text-white text-center">
        <small className="inline-block text-xs md:text-sm opacity-90 mb-2.5 bg-white/20 px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-full tracking-[0.2px]">영어 줄임말로 알아보는</small>
        <h1 className="m-0 text-[clamp(28px,8vw,36px)] md:text-[clamp(34px,6vw,52px)] leading-[1.12] md:leading-[1.2] font-black tracking-[-0.03em] break-keep">원어민력 테스트!</h1>
        <p className="mx-auto mt-2.5 md:mt-4 text-base md:text-[clamp(17px,2.5vw,22px)] max-w-[240px] md:max-w-[620px] leading-[1.35] md:leading-[1.5] opacity-96 font-bold break-keep">여러분은 원어민 문화를<br/>얼마나 이해하시나요?</p>
      </section>

      <section className="p-[14px_14px_18px] md:p-7 w-full">
        {screen === 'quiz' && (
          <div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2.5 md:gap-3.5 mb-3.5 md:mb-5 w-full">
              <div className="hidden bg-indigo-50 text-indigo-700 font-bold px-3.5 py-2.5 rounded-full text-sm whitespace-nowrap">현재 점수 {score} / 20</div>
              <div className="w-full min-w-0 col-span-2">
                <div className="text-xs md:text-[13px] text-gray-500 mb-1.5 md:mb-2 text-right">{currentIndex + 1} / 20</div>
                <div className="w-full h-2.5 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentIndex + (answered ? 1 : 0)) / quizData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#edf0f5] rounded-[20px] md:rounded-[24px] p-4 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] w-full min-w-0 h-[440px] md:h-[560px] flex flex-col justify-start overflow-hidden">
              <div className="text-gray-500 text-xs md:text-sm mb-2 md:mb-2.5 font-semibold flex-none">Question {currentIndex + 1}</div>
              <h2 className="text-[clamp(24px,10vw,38px)] md:text-[clamp(30px,7vw,52px)] font-extrabold tracking-[-0.02em] m-0 mb-2 md:mb-2.5 text-gray-900 min-h-[1.1em] md:min-h-[1.2em] flex-none">{item.q}</h2>
              <p className="text-sm md:text-[17px] text-gray-600 m-0 mb-4 md:mb-6 leading-[1.45] md:leading-[1.6] h-[42px] md:h-[56px] break-keep flex-none">다음 중 가장 알맞은 뜻을 골라보세요.</p>
              
              <div className="grid grid-cols-2 gap-2.5 md:gap-3.5 w-full h-[150px] md:h-[190px] items-stretch flex-none">
                {item.shuffledOptions.map((optionText, idx) => {
                  const isSelected = selectedOption === optionText;
                  const isCorrect = optionText === item.a;
                  
                  let buttonClass = "border-[1.5px] border-[#dbe2ea] bg-white rounded-[14px] md:rounded-[18px] p-3 md:p-[18px] text-[13px] md:text-base leading-[1.3] md:leading-[1.45] cursor-pointer transition-all duration-150 ease-out text-left h-[70px] md:h-[88px] w-full flex items-center justify-start overflow-hidden break-keep";
                  
                  if (answered) {
                    if (isCorrect) {
                      buttonClass += " bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += " bg-red-50 border-red-500 text-red-800 font-bold";
                    } else {
                      buttonClass += " opacity-45 cursor-default";
                    }
                  } else {
                    buttonClass += " hover:-translate-y-[2px] hover:border-purple-500 hover:shadow-[0_12px_24px_rgba(124,58,237,0.12)]";
                  }

                  return (
                    <button 
                      key={idx} 
                      className={buttonClass}
                      onClick={() => handleSelectAnswer(optionText, item.a)}
                      disabled={answered}
                    >
                      {optionText}
                    </button>
                  );
                })}
              </div>

              <div className={`mt-3 md:mt-[18px] p-3 md:p-[16px_18px] rounded-xl md:rounded-2xl text-[13px] md:text-[15px] leading-[1.4] md:leading-[1.6] min-h-[58px] md:min-h-[76px] max-h-[58px] md:max-h-[76px] flex-none overflow-hidden ${answered ? 'visible' : 'invisible'} ${selectedOption === item.a ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'} border`}>
                {answered && (
                  selectedOption === item.a 
                    ? <>정답입니다! <strong>{selectedOption}</strong></>
                    : <>아쉽네요! 정답은 <strong>{item.a}</strong> 입니다.</>
                )}
              </div>

              <div className="flex justify-end min-h-[44px] md:min-h-[54px] mt-auto flex-none items-end">
                <button 
                  className="border-none bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-[11px] md:px-[22px] md:py-[14px] rounded-full text-sm md:text-[15px] font-bold cursor-pointer shadow-[0_10px_24px_rgba(79,70,229,0.24)] transition-all duration-150 hover:-translate-y-[1px] disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!answered}
                  onClick={handleNext}
                >
                  {currentIndex === quizData.length - 1 ? '다음' : '다음 문제'}
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === 'entry' && (
          <div className="bg-white border border-[#edf0f5] rounded-[20px] md:rounded-[24px] p-4 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] w-full text-center relative h-auto">
            <div className="text-[clamp(19px,6vw,26px)] md:text-[clamp(20px,4vw,30px)] font-extrabold my-[18px] md:my-[18px] text-gray-900 leading-[1.3] md:leading-[1.5] break-keep">결과를 보기 전에<br/>어떤 경로로 들어오셨나요?</div>
            <div className="flex flex-col gap-4 mt-6">
              <button 
                className="border-none bg-gradient-to-br from-indigo-600 to-indigo-500 text-white px-4 py-[11px] md:px-[22px] md:py-[14px] rounded-2xl text-sm md:text-[15px] font-bold cursor-pointer shadow-[0_10px_24px_rgba(79,70,229,0.24)] transition-all duration-150 hover:-translate-y-[1px] min-h-[72px] flex flex-col items-center justify-center"
                onClick={() => handleUserType('internal')}
              >
                프린서플 수강생
                <span className="block text-[13px] opacity-85 font-medium mt-0.5">(내부 참여자)</span>
              </button>
              <button 
                className="border-none bg-gradient-to-br from-orange-500 to-orange-400 text-white px-4 py-[11px] md:px-[22px] md:py-[14px] rounded-2xl text-sm md:text-[15px] font-bold cursor-pointer shadow-[0_10px_24px_rgba(249,115,22,0.24)] transition-all duration-150 hover:-translate-y-[1px] min-h-[72px] flex items-center justify-center"
                onClick={() => handleUserType('external')}
              >
                외부 참여자
              </button>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="bg-white border border-[#edf0f5] rounded-[20px] md:rounded-[24px] p-4 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] w-full text-center relative h-auto">
            <div className="text-[13px] md:text-[15px] font-bold text-gray-500 mb-2.5">YOUR SCORE</div>
            <h2 className="text-[clamp(38px,13vw,58px)] md:text-[clamp(42px,10vw,72px)] font-black m-0 bg-gradient-to-br from-indigo-600 to-orange-500 bg-clip-text text-transparent">
              {score} / 20
            </h2>
            <div className="text-[clamp(19px,6vw,26px)] md:text-[clamp(20px,4vw,30px)] font-extrabold mt-[18px] mb-3 text-gray-900 leading-[1.3] md:leading-[1.5] break-keep">
              {getResultContent().headline}
            </div>
            <p className="text-sm md:text-base leading-[1.6] md:leading-[1.8] text-gray-700 max-w-[700px] mx-auto mb-7 whitespace-pre-line break-keep">
              {getResultContent().message}
            </p>
            <div className="mt-[26px] flex justify-center">
              <button 
                className="border-none bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-[11px] md:px-[22px] md:py-[14px] rounded-full text-sm md:text-[15px] font-bold cursor-pointer shadow-[0_10px_24px_rgba(79,70,229,0.24)] transition-all duration-150 hover:-translate-y-[1px]"
                onClick={() => setIsModalOpen(true)}
              >
                특강 초대장 열기
              </button>
            </div>
            <div className="mt-3.5 text-sm text-gray-500 font-semibold leading-[1.5] break-keep">버튼을 눌러 특강 초대장을 확인해보세요.</div>
            
            <div className="mt-7 flex justify-center">
              <button 
                className="border-none bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4 py-[11px] md:px-[22px] md:py-[14px] rounded-full text-sm md:text-[15px] font-bold cursor-pointer shadow-[0_10px_24px_rgba(17,24,39,0.18)] transition-all duration-150 hover:-translate-y-[1px]"
                onClick={handleRestart}
              >
                다시 테스트하기
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center p-3 md:p-6 z-50" onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false); }}>
                <div className="w-[min(100%,420px)] md:w-[min(100%,620px)] bg-[#fffdf8] relative rounded-[22px] md:rounded-[28px] p-[14px] md:p-[70px_24px_26px] shadow-[0_24px_60px_rgba(0,0,0,0.24)] border border-[#f3e8d1] max-h-[calc(100vh-24px)] md:max-h-[calc(100vh-48px)] overflow-y-auto text-left">
                  <button 
                    className="sticky top-0 left-0 border-none bg-gray-900/90 text-white px-3 py-2 md:px-3.5 md:py-2.5 rounded-full text-xs md:text-sm font-bold cursor-pointer z-10 mb-3 md:mb-4"
                    onClick={() => setIsModalOpen(false)}
                  >
                    결과로 돌아가기
                  </button>
                  <div className="w-full bg-gradient-to-b from-[#fffdf8] to-[#fffaf0] rounded-[22px] border border-[#f3e8d1] p-[18px_14px_16px] md:p-[26px_22px_24px]">
                    <div className="w-full md:w-[min(100%,420px)] mx-auto text-left">
                      <div className="inline-block text-xs font-extrabold tracking-[0.08em] text-orange-900 bg-orange-100 px-2.5 py-2 rounded-full mb-3.5">SPECIAL INVITATION</div>
                      <h3 className="text-[24px] md:text-[clamp(28px,5vw,38px)] font-black text-gray-900 leading-[1.2] md:leading-[1.18] tracking-[-0.02em] m-0 mb-3.5 md:mb-4 break-keep">Steve's special lecture about acronym</h3>
                      <p className="text-[13px] md:text-base leading-[1.75] md:leading-[1.8] text-gray-700 m-0 mb-[18px] break-keep">
                        {userType === 'internal' 
                          ? '프린서플 수강생을 위한 특별 영어 약어 수업입니다. 당일 시간에 맞춰 편하게 참석해 주세요.' 
                          : '원어민들이 실제로 자주 사용하는 영어 약어와 그 속에 담긴 문화, 뉘앙스를 재미있게 배우는 특별 수업입니다.'}
                      </p>
                      
                      {userType === 'external' && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 rounded-[18px] p-4 text-[13px] md:text-[15px] font-extrabold leading-[1.7] md:leading-[1.65] mb-[18px] break-keep">
                          외부 참여자도 무료로 참여 가능합니다.<br/>아래 링크를 통해 사전 신청해 주세요.
                        </div>
                      )}

                      <div className="grid gap-3 mt-3.5">
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 md:p-[14px_16px] text-left">
                          <span className="block text-[13px] text-gray-500 font-bold mb-1">DATE</span>
                          <span className="text-gray-900 font-medium text-sm md:text-base">3월 13일(금)</span>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 md:p-[14px_16px] text-left">
                          <span className="block text-[13px] text-gray-500 font-bold mb-1">TIME</span>
                          <span className="text-gray-900 font-medium text-sm md:text-base">11시 50분 ~ 13시</span>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 md:p-[14px_16px] text-left">
                          <span className="block text-[13px] text-gray-500 font-bold mb-1">PLACE</span>
                          <span className="text-gray-900 font-medium text-sm md:text-base">프린서플 어학원 301호</span>
                        </div>
                      </div>

                      {userType === 'external' && (
                        <div className="flex flex-col md:flex-row gap-3 mt-[22px]">
                          <a 
                            href="https://forms.gle/wjytZX7HUorDuUg47" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center justify-center p-3 md:p-[12px_16px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white no-underline text-sm md:text-[15px] font-extrabold shadow-[0_10px_22px_rgba(79,70,229,0.18)] w-full md:min-w-[260px]"
                          >
                            외부 참여자 신청하기
                          </a>
                        </div>
                      )}

                      <div className="mt-3.5 text-[13px] md:text-sm leading-[1.7] text-gray-500 break-keep">
                        {userType === 'external' 
                          ? '외부 참여자는 선착순 신청으로 진행됩니다.' 
                          : '프린서플 수강생은 별도 신청 없이 참여 가능합니다.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
