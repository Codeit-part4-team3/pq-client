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
  ㄴ 서버:체널=1:N 구조로 Room을 통한 socket 관리
- 토스페이먼츠 결제 SDK 적용
- CI/CD 구축
    - Jest를 활용하여 PR시 테스트 자동화
    - Git Actions와 AWS Codedeploy를 사용한 자동배포
<br />

## 🎸 세부내용
- Prisma 사용
- 서버 초대 기능(이메일 초대, 초대링크(암호화))
- 개별 스트림 통신 제어기능 구현  
  <br />  

## ❗ 이슈 및 해결
### ❓ 로컬환경에서 개발 및 테스트 시 유저서버와 채팅서버의 API URL이 동일한 문제 발생
API 요청 시 axios instance를 사용하고 있음 -> BaseURL을 구분해주면 어떨까<br />
- 서버별로 axios instance를 만들수도 있으나 추후 서버가 늘어나거나 api의 갯수가 늘어나면 휴먼에러가 빈번해질 수 있는 문제<br />
> 
> <strong> 😎 로컬전용 프록시서버를 만들어서 경로기반 라우팅을 적용하여 해결</strong>
> 
