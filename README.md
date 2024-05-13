# 🎙️ 실시간 채팅 애플리케이션 🎧
빽(Backend)없고 뒤(Design)없는 프론트엔드 4명의 풀스택 개발  
<br />  

<hr />
<div style="display: flex; justify-content: center; align-items: center; ">
  <img src="https://github.com/Codeit-part4-team3/pq-client/assets/68732996/15a7ead1-1adc-4208-9869-104de9cb0ad8" width="400" />
  <img src="https://github.com/Codeit-part4-team3/pq-client/assets/68732996/9292ff9d-19cf-413c-911d-823d1c67e36a" width="400" />
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrB10K%2FbtsGVLT8WUY%2FdvKJ14eCKkyIzmZpaeusu1%2Fimg.png" width="800" />
</div>
<hr />
<br />

## 🪄 Skill
React, Express, NestJS, AWS  
<br />

## 📱 주요기능
- 회원가입(OAuth) 및 로그인
- 실시간 채팅(음성/화상 포함)
- 멤버십 결제
<br />

## 🔥 핵심 개발내용
- AWS Route53/CloudFront/S3로 프론트엔드(React) 배포 및 이미지 저장
- MSA 서버구조(유저, 채팅, 소켓)로 AWS EC2에 배포(private)
    - 서버별 DB분리 유저/채팅서버(mysql), 채팅메시지(dynamoDB)
- AWS Cognito를 사용하여 유저관리(구글, 카카오 회원가입)
- WebRTC를 활용하여 p2p기반의 N:M 음성/화상 스트림 통신 구현
- WebSocket을 통한 실시간 통신 구현
  - 서버:체널=1:N 구조로 Room을 통한 socket 관리
- 토스페이먼츠 결제 SDK 적용
- CI/CD 구축
    - Jest를 활용하여 PR시 테스트 자동화
    - Git Actions와 AWS Codedeploy를 사용한 자동배포
<br />

## 서버 별 추가 내용

### 유저서버
- 처음 개발하는 백엔드여서 빠른 개발을 위해 NestJs 와 Prisma 사용
- 빠른 개발 및 유저관리와 토큰관리를 위해 AWS Cognito와 userdb 병행 사용
- 유저 사용감을 높이기 위해 같은 이메일 사용 시 OAuth로 로그인 가능
- JwtAuthGuard를 만들어 일부 api는 토큰 없을 시 예외 처리
- 이미지 파일을 받아서 S3에 업로드 후, url으로 바꿔 db에 저장 하여 유저 프로필 이미지 업데이트


## 🎸기타 개발내용
- Prisma 사용
- 서버 초대 기능(이메일 초대, 초대링크(암호화))
- 개별 스트림 통신 제어기능 구현
- 채팅메시지 알림UI
- 서버별 일정
- 스웨거 생성

  <br />

## 기타 개발 이미지
![tmdnprj](https://github.com/Codeit-part4-team3/pq-client/assets/59861974/2dae6a46-a03b-4b99-8d3a-afe325a69be8)
![ffsa](https://github.com/Codeit-part4-team3/pq-client/assets/59861974/938188b5-de7d-4216-bd96-306d691770db)


## ❗ 이슈 및 해결
### ❓ [MSA 서버구조의 로컬환경] 로컬환경에서 개발 및 테스트 시 유저서버와 채팅서버가 동일한 포트번호를 사용하고 있는 문제 발생. Port번호를 다르게 한다면 서버별로 API URL을 구분해야함
API 요청 시 axios instance를 사용하고 있음 -> BaseURL을 구분해주면 어떨까<br />
서버별로 axios instance를 만들수도 있으나 추후 서버가 늘어나거나 api의 갯수가 늘어나면 휴먼에러가 빈번해질 수 있는 문제<br />
> <strong>😎</strong>
> <strong>로컬전용 프록시서버를 만들어서 경로기반 라우팅을 적용하여 해결</strong>
<br />

### ❓[React + Socket] Socket통신중 채팅창 페이지에서는 채팅메시지 알림 이벤트를 처리가능한데 다른 특정 페이지에서 알림 이벤트를 처리 불가한 현상
> <strong>😎</strong>
> <strong> useSocket훅을 만들어서 프로그램 내에서 단 하나의 소켓인스턴스를 관리<br /></strong>
> <strong> 각 컴포넌트들에서는 socket.on으로 처리되는 각 메서드들에 대한 핸들러 함수만 관리하는 구조로 변경<br /></strong>
<br />  

### ❓[???] AWS S3에 upload하는 동작이 한명의 컴퓨터에서만 에러를 일으키는 현상
코드를 다시 clone해보고 동일한 .env파일 내용을 적용했으나 에러는 동일
계정문제인가 싶어서 정상인 컴퓨터에서 문제됬던 계정으로 시도하니 정상동작함 / 문제있는 컴퓨터에서 성공했던 계정으로 시도하니 실패
이것저것 시도해보고 리서치해보다가 환경변수에 로그를 찍어보라고 하여 보니 .env파일의 환경변수와 다른 값임... ?!?!??<br />
> <strong>😎</strong>
> <strong> 컴퓨터의 시스템환경변수에 가보니 .env파일과 동일한 이름의 키값이 존재했음<br /></strong>
> <strong> 이전에 테라폼 설정을 하면서 시스템 환경변수에 AWS관련 키를 추가했는데 공교롭게도 이름이 똑같아서 발생한 문제였다.<br /></strong>  
<br />

### ❓[EC2 + Nest] AWS EC2 Heap메모리 부족현상 발생
<strong>😎</strong>
<strong> aws-sdk 전체를 임포트  하니 메모리 부족 <br /></strong>
<strong> aws-sdk 내부에서 필요한 부분만 임포트 하여 해결 <br /></strong>
<br />  
