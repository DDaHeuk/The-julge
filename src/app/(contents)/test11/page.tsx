import FilledButton from '@/components/button/filledButton';
import NoFilledButton from '@/components/button/noFilledButton';
import DisabledButton from '@/components/button/disabledButton';

export default function test11() {
  return (
    <div>
      <FilledButton width={350} name="로그인 하기" />
      <NoFilledButton width={350} name="로그인 하기" />
      <DisabledButton width={350} name="신청불가" />
    </div>
  );
}
