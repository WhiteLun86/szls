<template>
    <div class="layout-container">
        <!-- 左侧导航 -->
        <div class="left-side">
            <div class="left-item"
                :class="{ 'left-item-active': index === activeLeft, 'left-item-default': index !== activeLeft }"
                v-for="(item, index) in leftItems" :key="index" @click="selectItem(item.id, index)">
                {{ item.name }}
                <img :src="item.icon" alt="icon" class="item-icon-left" />
            </div>
        </div>

        <!-- 中间展示区，包裹 transition 动画 -->
        <transition name="fade" mode="out-in">
            <div class="center-content" :key="selectedItem.id">
                <div class="content-left">
                    <div
                        style="font-family: Alibaba PuHuiTi; font-weight: bold; font-size: 2vw;color: #59BAF2; line-height: 32px;">
                        {{ selectedItem.name }}
                    </div>
                    <div
                        style="font-family: Alibaba PuHuiTi;font-weight: 400;font-size: 1vw;color: #FFFFFF;opacity: 0.7;">
                        {{ selectedItem.description }}
                    </div>
                    <div class="bottom-button">进入系统</div>
                </div>
                <div class="content-right">
                    <img :src="selectedItem.image" alt="selected image" class="selected-image" />
                </div>
            </div>
        </transition>

        <!-- 右侧导航 -->
        <div class="right-side">
            <div class="right-item"
                :class="{ 'righjt-item-active': index === activeright, 'right-item-default': index !== activeright }"
                v-for="(item, index) in rightItems" :key="index" @click="selectItem(item.id, index)">
                <img :src="item.icon" alt="icon" class="item-icon-right" />
                {{ item.name }}
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "MainLayout",
    data() {
        return {
            // 激活的按钮索引
            activeLeft: 0,
            activeRight: null,
            // 左侧导航的8个元素和图标
            leftItems: [
                { id: 1, name: "ERP", icon: require("@/assets/images/page2/l1.png") },
                { id: 2, name: "OA", icon: require("@/assets/images/page2/l2.png") },
                { id: 3, name: "CRM", icon: require("@/assets/images/page2/l3.png") },
                { id: 4, name: "BI", icon: require("@/assets/images/page2/l4.png") },
                { id: 5, name: "合同管理", icon: require("@/assets/images/page2/l5.png") },
                { id: 6, name: "财务系统", icon: require("@/assets/images/page2/l6.png") },
                { id: 7, name: "任务管理", icon: require("@/assets/images/page2/l7.png") },
                { id: 8, name: "文档系统", icon: require("@/assets/images/page2/l8.png") }
            ],
            // 右侧导航的8个元素和图标
            rightItems: [
                { id: 9, name: "MES", icon: require("@/assets/images/page2/r1.png") },
                { id: 10, name: "WMS", icon: require("@/assets/images/page2/r1.png") },
                { id: 11, name: "数字看板", icon: require("@/assets/images/page2/r3.png") },
                { id: 12, name: "产品溯源", icon: require("@/assets/images/page2/r4.png") },
                { id: 13, name: "能耗管理", icon: require("@/assets/images/page2/r5.png") },
                { id: 14, name: "QMS", icon: require("@/assets/images/page2/r6.png") },
                { id: 15, name: "PDM", icon: require("@/assets/images/page2/r7.png") },
                { id: 16, name: "采购管理", icon: require("@/assets/images/page2/r8.png") }
            ],
            // 默认选中的选项
            selectedItem: {
                name: "ERP系统概述",
                description: "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
                image: require("@/assets/images/page2/center1.png")
            },
            //中间展示内容
            centralContent: [
                {
                    name: "ERP系统概述",
                    description: "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
                    image: require("@/assets/images/page2/center1.png")
                },
                {
                    name: "OA系统概述",
                    description: "办公自动化（OA）是将计算机、通信等现代化技术运用到传统办公方式，进而形成的一种新型办公方式。它利用现代化设备和信息化技术，代替办公人员传统的部分手动或重复性业务活动，优质而高效地处理办公事务和业务信息，实现对信息资源的高效利用，进而达到提高生产率、辅助决策的目的，最大限度地提高工作效率和质量、改善工作环境。办公自动化（OA）是一个企业除了生产控制之外的一切信息处理与管理的集合。",
                    image: require("@/assets/images/page2/center2.png")
                },
                {
                    name: "CRM系统概述",
                    description: "CRM是“客户关系管理”（Customer Relationship Management）的缩写。它是一种管理公司与当前客户及潜在客户之间关系的战略和技术。CRM系统旨在提升企业的客户满意度和忠诚度，通过收集、分析和利用客户数据，帮助企业更好地理解客户需求，从而提高销售、改善服务和优化营销活动。",
                    image: require("@/assets/images/page2/center3.png")
                },
                {
                    name: "BI系统概述",
                    description: "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
                    image: require("@/assets/images/page2/center4.png")
                },
                {
                    name: "合同管理系统概述",
                    description: "合同管理是指利用数字化工具和技术来创建、存储、追踪、分析和执行合同的全过程。它旨在提高合同管理的效率、透明度和合规性，从而优化企业的运营和风险管理。数字化合同管理使得合同管理更加高效、透明和系统化，减少了手动操作、提高了协作效率，并增强了合同的合规性和风险管理能力。",
                    image: require("@/assets/images/page2/center5.png")
                },
                {
                    name: "财务系统系统概述",
                    description: "财务系统是一种集成的软件解决方案，旨在帮助企业管理和自动化与财务相关的所有功能。这些功能包括预算、会计、财务报表、现金流管理、费用跟踪、资产管理等，以实现高效、准确的财务管理。数字化财务系统的主要优势包括提高运营效率、减少人为错误、增强数据的准确性和安全性、提高透明度和合规性，以及提供更好的财务洞察，从而支持企业的整体战略目标与规划。",
                    image: require("@/assets/images/page2/center6.png")
                },
                {
                    name: "任务管理系统概述",
                    description: "任务管理是指利用软件工具和技术来规划、追踪、组织和执行任务的过程。它旨在提高团队的协作效率、工作透明度和项目管理能力。任务管理系统通常用于日常工作、项目管理和团队协作，能够帮助用户更好地分配资源、优化时间管理，并确保任务按时完成。任务管理系统的优势包括提高工作效率、减少沟通障碍、提升团队协调能力，以及增强项目管理的可视性和控制力。团队可以更有条理地完成任务，推动项目成功。",
                    image: require("@/assets/images/page2/center7.png")
                },
                {
                    name: "文档系统概述",
                    description: "文档系统（Document Management System，DMS）是指用于创建、存储、管理和追踪电子文档及其相关信息的软件系统。文档系统旨在提高文档的存取、组织和安全性，提供便捷的文档共享与协作功能，从而增强企业的工作效率、合规性和信息管理能力。数字化文档系统的优势包括提升文档管理的效率，降低纸质文档的使用，改善信息的可访问性与安全性，以及增强团队的协作能力。企业能够更有效地管理和利用其文档资源。",
                    image: require("@/assets/images/page2/center8.png")
                },
                {
                    name: "采购管理系统概述",
                    description: "采购管理指的是利用数字化工具和技术来规划、执行和监控采购活动的过程。这包括从供应商选择、合同管理到采购订单处理和付款的整个流程。数字化采购管理旨在提高采购效率、降低成本、增强透明度和合规性，从而优化企业的供应链管理。数字化采购管理的优势包括提高采购流程的效率和准确性、降低操作成本、增强透明度、提高供应商管理的有效性和确保合规性。可以帮助企业优化采购流程，提升整体供应链的绩效。",
                    image: require("@/assets/images/page2/center9.png")
                },
                {
                    name: "MES系统概述",
                    description: "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
                    image: require("@/assets/images/page2/center10.png")
                },
                {
                    name: "WMS系统概述",
                    description: "WMS（仓库管理系统，Warehouse Management System）是一种专门用于管理和优化仓库及其相关操作的软件系统。WMS通过自动化和数字化的手段，帮助企业提高仓储效率、减少运营成本、提升库存管理能力，从而优化供应链管理。WMS的优势包括提高仓库操作的效率和准确性、减少人工错误、提升库存可视化和管理能力、加快订单处理速度、降低运营成本等。通过有效的WMS系统，企业能够实现更灵活的库存管理，提升客户满意度并增强市场竞争力。",
                    image: require("@/assets/images/page2/center11.png")
                },
                {
                    name: "数字看板概述",
                    description: "数字看板（Digital Dashboard）是一种可视化工具，用于呈现关键绩效指标（KPI）和实时数据，帮助企业和团队快速了解业务状况、执行情况和目标达成程度。数字看板将大量的数据和信息以图形化、简洁的方式展示，使用户能够一目了然地把握关键指标和趋势，从而支持快速决策和行动。数字看板的优势包括提高决策效率、增强运营透明度、改进数据可视化、促进团队协作等。通过实施数字看板，企业能够更好地监控业务健康状况，迅速作出反应，从而提升竞争力和适应市场变化的能力。",
                    image: require("@/assets/images/page2/center12.png")
                },
                {
                    name: "产品溯源系统概述",
                    description: "产品溯源（Product Traceability）是指通过信息技术和系统，跟踪和记录产品从原材料到最终用户的整个生命周期的过程。产品溯源能够确保产品在生产、运输、销售和使用过程中每个环节的信息都可以被准确记录和追踪。这种能力对于确保产品质量、安全性和合规性非常重要。产品溯源的优势包括提升产品质量管理、增强透明度、提高消费者信任、促进合规性审计以及提高供应链效率。在数字化转型的背景下，企业越来越依赖物联网（IoT）、区块链、云计算和大数据等技术来实现智能化的产品溯源管理。这些技术能够大大改善数据的采集和分析能力，提高溯源过程的效率和准确性。",
                    image: require("@/assets/images/page2/center13.png")
                },
                {
                    name: "能耗管理系统概述",
                    description: "能耗管理（Energy Management）是指通过监测、分析和优化能源使用，以提高能源效率、降低能源成本、减少环境影响的一系列活动和策略。能耗管理利用数字化技术和智能系统，帮助企业和组织实现对能源使用的实时可视化和管理，从而促进可持续发展。能耗管理的优势包括降低运营成本、提高能源使用效率、减少碳排放、支持可持续发展目标、增强企业的社会责任感等。随着数字化技术的不断发展，越来越多的企业采用智能电表、能源管理系统（EMS）和云计算等工具，来实现更高效、更动态的能耗管理，以满足日益增长的环境保护和能源节约要求。",
                    image: require("@/assets/images/page2/center14.png")
                },
                {
                    name: "QMS系统概述",
                    description: "QMS（质量管理系统，Quality Management System）是一套用于定义、控制和改进产品或服务质量的框架。QMS帮助企业确保其产品或服务符合客户期望、行业标准和法规要求。通过实施质量管理系统，企业可以实现持续改进、减少浪费、优化资源利用，从而提高竞争力。数字化QMS系统的优势包括增强质量控制和追踪能力、提高合规性、降低质量成本、促进数据驱动的决策，以及增强客户满意度。企业通过QMS系统可以更好地满足客户的高质量要求，并在激烈的市场竞争中保持优势。",
                    image: require("@/assets/images/page2/center15.png")
                },
                {
                    name: "DPM系统概述",
                    description: "PDM（产品数据管理，Product Data Management）是指对产品相关数据和信息进行系统化管理的过程和工具。PDM的主要目标是集中存储、管理和共享与产品生命周期相关的信息，以提高产品开发及管理效率，并确保数据的一致性和可靠性。PDM系统的实施可以大幅提升企业在技术快速变化和竞争加剧的环境下的适应能力，确保企业能够高效、灵活地管理和推出新产品。",
                    image: require("@/assets/images/page2/center16.png")
                },
            ]
        };

    },
    methods: {
        // 选择项目时动态更新
        selectItem(id, index) {
            this.selectedItem = this.centralContent[id - 1];
            this.activeLeft = null;
            this.activeRight = null;
            if (id < 9) {
                this.activeLeft = index;
            } else {
                this.activeRight = index;
            }


        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}



.layout-container {
    padding: 77px 16px 16px 16px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: calc(100% - 77px);
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    /* 左右各1/6，中间2/3 */
    gap: 10px;
    height: 100vh;
    /* 占满整个视口高度 */
}

.left-side,
.right-side {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    /* 8行，每个元素均匀分布 */
    gap: 10px;
    padding: 10px;
    z-index: 10;
}

.left-item-default {
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 30px;
    height: 5vh;
    color: #59BAF2;
    line-height: 30px;
    border: 3px solid transparent;
    border-radius: 40px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #1120419c, #1120419c), linear-gradient(90deg, #112041 61%, #2461D1);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    /* 改进过渡效果 */

}

.right-item-default {
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 30px;
    height: 5vh;
    color: #59BAF2;
    line-height: 30px;
    border: 3px solid transparent;
    border-radius: 40px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #1120419c, #1120419c), linear-gradient(-90deg, #112041 61%, #2461D1);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    /* 改进过渡效果 */
}

.left-item:hover,
.right-item:hover {
    /* 鼠标悬停时背景色 */
    cursor: pointer;
    color: #ffffff;
    /* 字体颜色在悬停时变白 */
    background-image: linear-gradient(to right, #2461D1, #59BAF2);
    /* 改变背景颜色渐变 */
    transform: scale(1.05);
    /* 略微放大元素 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
}

/* 点击后激活的效果，与 hover 状态相同 */
.left-item-active,
.right-item-active {
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 30px;
    height: 5vh;
    color: #59BAF2;
    line-height: 30px;
    border: 3px solid transparent;
    border-radius: 40px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    /* background-image: linear-gradient(to right, #1120419c, #1120419c), linear-gradient(90deg, #112041 61%, #2461D1); */

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    color: #ffffff;
    background-image: linear-gradient(to right, #2461D1, #59BAF2);
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.item-icon-left {
    width: 30px;
    height: 30px;
    margin-left: 10px;

}

.item-icon-right {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.center-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 60%;
    width: 90%;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: url("~@/assets/images/page2-back.png") no-repeat;
    background-size: 100% 100%;
    margin: 10vh auto;
}

.content-left {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

}

.bottom-button {
    background-image: url('~@/assets/images/page2/btn-bg.png');
    background-size: contain;
    /* 保持背景图片比例 */
    background-repeat: no-repeat;
    /* 背景图片不重复 */
    height: 45px;
    width: 159px;
    /* background-size: cover; */
    border: none;
    /* 去掉边框 */
    cursor: pointer;
    /* 鼠标悬停时不改变指针 */
    display: flex;
    /* 使用 flex 布局来实现居中对齐 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 18px;
    color: #EBA14B;
    line-height: 30px;
}


.content-right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.selected-image {
    width: 90%;
    height: auto;
    /* max-width: 400px; */
    border-radius: 10px;
}
</style>