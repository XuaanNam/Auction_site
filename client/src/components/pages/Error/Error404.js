
import React from 'react'
import ErrorC from '../../assets/Error404.module.css'

export default function Error404 () {
    return(
        <div className={ErrorC.BgPage}>
            <a href="##">
                <header class={ErrorC.topHeader}>
                </header>

                {/* <!--dust particel--> */}
                <div>
                    <div class={ErrorC.starsec}></div>
                    <div class={ErrorC.starthird}></div>
                    <div class={ErrorC.starfourth}></div>
                    <div class={ErrorC.starfifth}></div>
                </div>
                {/* <!--Dust particle end---> */}


                <div class={ErrorC.lamp__wrap}>
                <div class={ErrorC.lamp}>
                    <div class={ErrorC.cable}></div>
                    <div class={ErrorC.cover}></div>
                    <div class={ErrorC.inCover}>
                    <div class={ErrorC.bulb}></div>
                    </div>
                    <div class={ErrorC.light}></div>
                </div>
                </div>
                {/* <!-- END Lamp --> */}
                <section class={ErrorC.error}>
                {/* <!-- Content --> */}
                <div class={ErrorC.error__content}>
                    <div class={`${ErrorC.error__message} `}>
                    <h1 class={ErrorC.message__title}>PAGE NOT FOUND</h1>
                    <p class={ErrorC.message__text}>Trang yêu cầu không tồn tại hoặc liên kết trang đó đã hỏng.<br></br> Bạn có thể trở về trang chủ!</p>
                    </div>
                    <div class={`${ErrorC.error__nav} ${ErrorC.eNav}`}>
                        <a href="/home" class={ErrorC.eNav__link}> </a>
                    </div>
                </div>
                {/* <!-- END Content --> */}

                </section>

            </a>
        </div>
    )

}

// export default Error404;