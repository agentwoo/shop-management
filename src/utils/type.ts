
// 用户信息相关配置
export interface IuserList {
    user_id: number;
    user_name: string;
    password: string;
    user_img: string;
    comment: string;
}


// 商品分类相关配置
export interface Igoodskinds {
    kind_id?: number,
    text: string,
    value: string,
}

// 轮播图相关配置
export interface Iswiper {
    swiper_id: string,
    swiper_url: string,
}

// 商品收藏相关配置
export interface Icollect {
    collect_id: number,
    collect_user_id: string,
    collect_user_name: string,
    goods_id: string,
    collect_create_time: string,
    goods_present_price: number,
    goods_title_img: string,
    goods_contact: string,
    goods_status: string,
    goods_title: string,
    goods_desc: string,
    is_delgoods: string,
}


// 商品订单相关配置
export interface Iorder {
    order_id: number,
    is_delorder: string,
    order_create_time: string,
    buy_user_id: number,
    buy_user_name: string,
    goods_id: number,
    goods_present_price: number,
    goods_title_img: string,
    goods_contact: string,
    goods_status: string,
    goods_title: string,
    goods_desc: string,
}


// 所有商品相关配置
export interface Igoods {
    goods_id: number,
    goods_title: string,
    goods_desc: string,
    goods_origin_price: string,
    goods_present_price: string,
    goods_title_img: string,
    goods_contact: string,
    goods_pid: string,
    goods_kind: string,
    goods_pub_time: string,
    goods_views: string,
    is_delgoods: string,
    goods_status: string,
    pub_user_id: number,
    pub_user: string,
    goods_swiper_img1: string,
    goods_swiper_img2: string,
    goods_swiper_img3: string,
    goods_swiper_img4: string,
}
