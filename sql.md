# MYSQL 외래키(Foreign key) 지정 시 
## on delete rule(삭제 시), on update rule(변경 시) 옵션 지정
## RESTRICT, CASCADE, NO ACTION, SET NULL

1. RESTRICT : 개체를 변경/삭제할 때 다른 개체가 변경/삭제할 개체를 참조하고 있을 경우 변경/삭제가 취소됩니다.(제한)

2. CASCADE : 개체를 변경/삭제할 때 다른 개체가 변경/삭제할 개체를 참조하고 있을 경우 함께 변경/삭제됩니다.

3. NO ACTION : 개체를 변경/삭제할 때 다른 개체가 변경/삭제할 개체를 참조하고 있을 경우 변경/삭제할 개체만 변경/삭제되고 참조하고 있는 개체는 변동이 없습니다.

4. SET NULL : 개체를 변경/삭제할 때 다른 개체가 변경/삭제할 개체를 참조하고 있을 경우 참조하고 있는 값은 NULL로 세팅됩니다.

> 출처: https://h5bak.tistory.com/125 [이준빈은 호박머리]