'use client'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

dayjs.extend(localizedFormat)

const Time = ({date}: any) => {

    return (
        <time className={'text-base text-zinc-400'}>
            {dayjs(date).format('YYYY年M月D日')}
        </time>
    );
}


export default Time
