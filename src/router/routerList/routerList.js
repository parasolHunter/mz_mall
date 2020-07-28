/**
 *  路由懒加载
 *  定义：懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。从而提升了系统性能。
 *
 */
const demo = r => require.ensure([], () => r(require('@/views/demo.vue')), 'demo')
const index = r => require.ensure([], () => r(require('@/views/home.vue')), 'index')

// by wzh
const Home = r => require.ensure([], () => r(require('@/views/home/home.vue')), 'home')
const Messages = r => require.ensure([], () => r(require('@/views/message/message.vue')), 'message')
const MessageDetail = r => require.ensure([], () => r(require('@/views/message/detail.vue')), 'detail')
const Itemize = r => require.ensure([], () => r(require('@/views/itemize/itemize.vue')), 'itemize')
const Brands = r => require.ensure([], () => r(require('@/views/brand/brand.vue')), 'brands')
const Search = r => require.ensure([], () => r(require('@/views/search/search.vue')), 'search')
const Goods = r => require.ensure([], () => r(require('@/views/goods/goods.vue')), 'goods')
const GoodDetail = r => require.ensure([], () => r(require('@/views/goods/detail.vue')), 'detail')
const Comment = r => require.ensure([], () => r(require('@/views/goods/comment.vue')), 'comment')
const Confirmed = r => require.ensure([], () => r(require('@/views/my/order/confirmed.vue')), 'confirmed')

const My = r => require.ensure([], () => r(require('@/views/my/my.vue')), 'my')
const Shopping = r => require.ensure([], () => r(require('@/views/shopping/shopping.vue')), 'shopping')
const Details = r => require.ensure([], () => r(require('@/views/details/details.vue')), 'details')

const NoPage = r => require.ensure([], () => r(require('@/views/no-page/no-page.vue')), 'noPage')

// by drd
const Set = r => require.ensure([], () => r(require('@/views/my/set/set.vue')), 'set')
const SecuritySet = r => require.ensure([], () => r(require('@/views/my/set/securitySet.vue')), 'securitySet')
const EditPwd = r => require.ensure([], () => r(require('@/views/my/set/editPwd.vue')), 'editPwd')
const Balance = r => require.ensure([], () => r(require('@/views/my/wallet/balance.vue')), 'balance')
const Draw = r => require.ensure([], () => r(require('@/views/my/wallet/draw.vue')), 'draw')
const BindAccount = r => require.ensure([], () => r(require('@/views/my/wallet/bindAccount.vue')), 'bindAccount')
const Recharge = r => require.ensure([], () => r(require('@/views/my/wallet/recharge.vue')), 'recharge')
const WalletDetails = r => require.ensure([], () => r(require('@/views/my/wallet/walletDetails.vue')), 'walletDetails')
const RechargeRecords = r => require.ensure([], () => r(require('@/views/my/wallet/rechargeRecords.vue')),'rechargeRecords')
const DrawRecords = r => require.ensure([], () => r(require('@/views/my/wallet/drawRecords.vue')), 'drawRecords')
const Orders = r => require.ensure([], () => r(require('@/views/my/order/orders.vue')), 'orders')
const OrderDetail = r => require.ensure([], () => r(require('@/views/my/order/orderDetail.vue')), 'orderDetail')
const Returns = r => require.ensure([], () => r(require('@/views/my/order/returns.vue')), 'returns')
const ReturnsList = r => require.ensure([], () => r(require('@/views/my/order/returnsList.vue')), 'returnsList')
const ReturnsDetail = r => require.ensure([], () => r(require('@/views/my/order/returnsDetail.vue')), 'returnsDetail')
const Logistics = r => require.ensure([], () => r(require('@/views/my/order/logistics.vue')), 'logistics')
// by shl
const Login = r => require.ensure([], () => r(require('@/views/login/login.vue')), 'Login')
const RegisterMain = r => require.ensure([], () => r(require('@/views/login/registerMain.vue')), 'registerMain')
const SystemSet = r => require.ensure([], () => r(require('@/views/my/systemSet/systemSet.vue')), 'systemSet')
const UserAgreement = r => require.ensure([], () => r(require('@/views/my/systemSet/userAgreement.vue')), 'userAgreement')
const PrivacyNotice = r => require.ensure([], () => r(require('@/views/my/systemSet/privacyNotice.vue')), 'privacyNotice')
const Feedback = r => require.ensure([], () => r(require('@/views/my/systemSet/feedback.vue')), 'feedback')
const Invitation = r => require.ensure([], () => r(require('@/views/my/Invitation/Invitation.vue')), 'Invitation')
const Signin = r => require.ensure([], () => r(require('@/views/my/signin/signin.vue')), 'Signin')
const IntegralDetails = r => require.ensure([], () => r(require('@/views/my/signin/IntegralDetails.vue')), 'IntegralDetails')
const Address = r => require.ensure([], () => r(require('@/views/my/address/address.vue')), 'Address')
const Aeaddress = r => require.ensure([], () => r(require('@/views/my/address/editAddress.vue')), 'Aeaddress')
const Collection = r => require.ensure([], () => r(require('@/views/my/collection/collection.vue')), 'collection')
const MyInvitation = r => require.ensure([], () => r(require('@/views/my/Invitation/myInvitation.vue')), 'myInvitation')
const Register = r => require.ensure([], () => r(require('@/views/login/register.vue')), 'Register')
const Download = r => require.ensure([], () => r(require('@/views/login/downLoad.vue')), 'download')
const evaluate = r => require.ensure([], () => r(require('@/views/my/order/evaluate.vue')), 'evaluate')
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
export default [{
        path: '/',
        name: 'index',
        component: index,
        redirect: '/home'
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        redirect: '/home',
        children: [{
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/my',
                name: 'my',
                component: My
            },
            {
                path: '/itemize',
                name: 'itemize',
                component: Itemize
            },
            {
                path: '/shopping',
                name: 'shopping',
                component: Shopping
            },
        ]
    },
    // by wzh
    {
        path: '/goods',
        name: 'goods',
        component: Goods
    },
    {
        path: '/good/:goodid',
        name: 'good-detail',
        component: GoodDetail
    },
    {
        path: '/good/:goodid/comments',
        name: 'comment',
        component: Comment
    },
    {
        path: '/brands',
        name: 'brands',
        component: Brands
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/messages',
        name: 'messages',
        component: Messages
    },
    {
        path: '/message/:messageid',
        name: 'message-detail',
        component: MessageDetail
    },
    {
        path: '/comfirmed/:good',
        name: 'comfirmed',
        component: Confirmed
    },
    //by drd
    {
        path: '/set',
        name: 'set',
        component: Set
    },
    {
        path: '/securitySet',
        name: 'securitySet',
        component: SecuritySet
    },
    {
        path: '/editPwd/:pwdType',
        name: 'editPwd',
        component: EditPwd
    },
    {
        path: '/balance',
        name: 'balance',
        component: Balance
    },
    {
        path: '/draw',
        name: 'draw',
        component: Draw
    },
    {
        path: '/bindAccount',
        name: 'bindAccount',
        component: BindAccount
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: Recharge
    },
    {
        path: '/walletDetails',
        name: 'walletDetails',
        component: WalletDetails
    },
    {
        path: '/rechargeRecords',
        name: 'rechargeRecords',
        component: RechargeRecords
    },
    {
        path: '/drawRecords',
        name: 'drawRecords',
        component: DrawRecords
    },
    {
        path: '/orders/:nav',
        name: 'orders',
        component: Orders
    },
    {
        path: '/order/:orderid',
        name: 'order-detail',
        component: OrderDetail
    },
    {
        path: '/logistics',
        name: 'logistics',
        component: Logistics
    },
    {
        path: '/returns/:orderid',
        name: 'returns',
        component: Returns
    },
    {
        path: '/returnsList',
        name: 'returnsList',
        component: ReturnsList
    },
    {
        path: '/returnsDetail/:id',
        name: 'returnsDetail',
        component: ReturnsDetail
    },
    //by shl
    {
        path: '/signin',
        name: 'signin',
        component: Signin
    },{
        path: '/IntegralDetails',
        name: 'IntegralDetails',
        component: IntegralDetails
    },{
        path: '/evaluate',
        name: 'evaluate',
        component: evaluate
    },{
        path: '/Invitation',
        name: 'Invitation',
        component: Invitation
    },{
        path: '/myInvitation',
        name: 'myInvitation',
        component: MyInvitation
    },
    {
        path: '/address',
        name: 'address',
        component: Address
    },
    {
        path: '/aeAddress/:addressType',
        name: 'aeAddress',
        component: Aeaddress
    },
    {
        path: '/collection',
        name: 'collection',
        component: Collection
    },
    {
        path: '/systemSet',
        name: 'systemSet',
        component: SystemSet
    },
    {
        path: '/userAgreement',
        name: 'userAgreement',
        component: UserAgreement
    },
    {
        path: '/privacyNotice',
        name: 'privacyNotice',
        component: PrivacyNotice
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: Feedback
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/registerMain',
        name: 'registerMain',
        component: RegisterMain
    },
    {
        path: '/download',
        name: 'download',
        component: Download
    },
    {
        path: '*',
        name: '404',
        component: NoPage
    },
    {
        path: '/demo',
        name: 'demo',
        component: demo
    }
]
