<template>
  <div class="layout-container">
    <!-- 左侧导航 -->
    <div class="left-side">
      <div class="container" v-for="(item, index) in items.slice(0, 3)" :key="index">
        <div class="header">
          {{ item.name }}
        </div>
        <div class="content">
          <template v-if="item.children && item.children.length > 0">
            <div v-for="child in item.children" :key="child.id" @click="selectItem(child)" class="item" :class="{
              'left-item-active': child.id === currentActive,
              'left-item-default': child.id !== currentActive,
            }">
              {{ child.name }}
              <img :src="child.icon" alt="icon" class="item-icon-left" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="center-content" :key="selectedItem.id">
      <div class="content-title">
        <div style="
            font-family: Alibaba PuHuiTi;
            font-weight: 500;
            font-size: 3vh;
            color: rgb(255, 255, 255);
            line-height: 30px;
            padding-bottom: 1vh;
          ">
          介绍
        </div>
      </div>
      <div class="content-left">
        <div style="
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            font-size: 2vw;
            color: #59baf2;
            line-height: 32px;
          ">
          {{ selectedItem.name }}
        </div>
        <div style="
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            font-size: 1vw;
            color: #ffffff;
            opacity: 0.7;
          ">
          {{ selectedItem.description }}
        </div>
        <div class="bottom-button">进入系统</div>
      </div>
      <div class="content-right">
        <img :src="selectedItem.image" alt="selected image" class="selected-image" />
      </div>
    </div>

    <!-- 右侧导航 -->
    <div class="right-side">
      <div class="container" v-for="(item, index) in items.slice(3,)" :key="index">
        <div class="header">
          {{ item.name }}
        </div>
        <div class="content">
          <template v-if="item.children && item.children.length > 0">
            <div v-for="child in item.children" :key="child.id" @click="selectItem(child)" class="item" :class="{
              'right-item-active': child.id === currentActive,
              'right-item-default': child.id !== currentActive,
            }">
              {{ child.name }}
              <img :src="child.icon" alt="icon" class="item-icon-left" />
            </div>
          </template>
        </div>
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
      currentActive: 0,

      items: [
        {
          name: "供应链",
          children: [
            {
              id: 0,
              name: "ERP系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
              image: require("@/assets/images/page2/center1.png"),
            },
            {
              id: 1,
              name: "WMS系统",
              icon: require("@/assets/images/page2/r1.png"),
              description:
                "WMS（仓库管理系统，Warehouse Management System）是一种专门用于管理和优化仓库及其相关操作的软件系统。WMS通过自动化和数字化的手段，帮助企业提高仓储效率、减少运营成本、提升库存管理能力，从而优化供应链管理。WMS的优势包括提高仓库操作的效率和准确性、减少人工错误、提升库存可视化和管理能力、加快订单处理速度、降低运营成本等。通过有效的WMS系统，企业能够实现更灵活的库存管理，提升客户满意度并增强市场竞争力。",
              image: require("@/assets/images/page2/center11.png"),
            },

            {
              id: 2,
              name: "SAP",
              icon: require("@/assets/images/page2/l2.png"),
              description:
                "WMS（仓库管理系统，Warehouse Management System）是一种专门用于管理和优化仓库及其相关操作的软件系统。WMS通过自动化和数字化的手段，帮助企业提高仓储效率、减少运营成本、提升库存管理能力，从而优化供应链管理。WMS的优势包括提高仓库操作的效率和准确性、减少人工错误、提升库存可视化和管理能力、加快订单处理速度、降低运营成本等。通过有效的WMS系统，企业能够实现更灵活的库存管理，提升客户满意度并增强市场竞争力。",
              image: require("@/assets/images/page2/center11.png"),
            },
          ],
        },
        {
          name: "研发设计",
          children: [
            {
              id: 3,
              name: "PDM系统",
              icon: require("@/assets/images/page2/r7.png"),
              description:
                "PDM（产品数据管理，Product Data Management）是指对产品相关数据和信息进行系统化管理的过程和工具。PDM的主要目标是集中存储、管理和共享与产品生命周期相关的信息，以提高产品开发及管理效率，并确保数据的一致性和可靠性。PDM系统的实施可以大幅提升企业在技术快速变化和竞争加剧的环境下的适应能力，确保企业能够高效、灵活地管理和推出新产品。",
              image: require("@/assets/images/page2/center16.png"),
            },
            {
              id: 4,
              name: "PLM系统",
              icon: require("@/assets/images/page2/r7.png"),
              description:
                "PDM（产品数据管理，Product Data Management）是指对产品相关数据和信息进行系统化管理的过程和工具。PDM的主要目标是集中存储、管理和共享与产品生命周期相关的信息，以提高产品开发及管理效率，并确保数据的一致性和可靠性。PDM系统的实施可以大幅提升企业在技术快速变化和竞争加剧的环境下的适应能力，确保企业能够高效、灵活地管理和推出新产品。",
              image: require("@/assets/images/page2/center16.png"),
            },
          ],
        },

        {
          name: "销售服务",
          children: [
            {
              id: 5,
              name: "CRM系统",
              icon: require("@/assets/images/page2/l3.png"),
              description:
                "CRM是“客户关系管理”（Customer Relationship Management）的缩写。它是一种管理公司与当前客户及潜在客户之间关系的战略和技术。CRM系统旨在提升企业的客户满意度和忠诚度，通过收集、分析和利用客户数据，帮助企业更好地理解客户需求，从而提高销售、改善服务和优化营销活动。",
              image: require("@/assets/images/page2/center3.png"),
            },
            {
              id: 6,
              name: "设备远程运维",
              icon: require("@/assets/images/page2/l3.png"),
              description:
                "CRM是“客户关系管理”（Customer Relationship Management）的缩写。它是一种管理公司与当前客户及潜在客户之间关系的战略和技术。CRM系统旨在提升企业的客户满意度和忠诚度，通过收集、分析和利用客户数据，帮助企业更好地理解客户需求，从而提高销售、改善服务和优化营销活动。",
              image: require("@/assets/images/page2/center3.png"),
            },
            {
              id: 7,
              name: "质量追溯",
              icon: require("@/assets/images/page2/l3.png"),
              description:
                "CRM是“客户关系管理”（Customer Relationship Management）的缩写。它是一种管理公司与当前客户及潜在客户之间关系的战略和技术。CRM系统旨在提升企业的客户满意度和忠诚度，通过收集、分析和利用客户数据，帮助企业更好地理解客户需求，从而提高销售、改善服务和优化营销活动。",
              image: require("@/assets/images/page2/center3.png"),
            },
          ],
        },
        {
          name: "生产执行",
          children: [
            {
              id: 8,
              name: "APS智能排产",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "办公自动化（OA）是将计算机、通信等现代化技术运用到传统办公方式，进而形成的一种新型办公方式。它利用现代化设备和信息化技术，代替办公人员传统的部分手动或重复性业务活动，优质而高效地处理办公事务和业务信息，实现对信息资源的高效利用，进而达到提高生产率、辅助决策的目的，最大限度地提高工作效率和质量、改善工作环境。办公自动化（OA）是一个企业除了生产控制之外的一切信息处理与管理的集合。",
              image: require("@/assets/images/page2/center2.png"),
            },
            {
              id: 9,
              name: "MES系统",
              icon: require("@/assets/images/page2/r1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 10,
              name: "DCS系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 11,
              name: "SCADA系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 12,
              name: "YMS系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 13,
              name: "设备健康管家",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 14,
              name: "魔镜AI",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 15,
              name: "能碳管理平台",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 16,
              name: "道具管理系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "MES（制造执行系统，Manufacturing Execution System）是一种集成的软件系统，用于监控、控制和优化制造过程中的各种活动。MES在生产管理中起着关键作用，它连接了企业的各个层面，从工厂车间到企业资源规划（ERP）系统，确保信息的实时流动，从而提高生产效率、质量和灵活性。MES的优势包括提高生产透明度、优化生产流程、降低生产成本、缩短交货时间、提升产品质量以及增强企业的快速响应能力。通过实施MES，企业能够在激烈的市场竞争中更好地满足客户需求并提升自身的竞争力。",
              image: require("@/assets/images/page2/center10.png"),
            },
            {
              id: 17,
              name: "ERP系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
              image: require("@/assets/images/page2/center1.png"),
            },

          ],
        },
        {
          name: "管理决策",
          children: [
            {
              id: 18,
              name: "ERP系统",
              icon: require("@/assets/images/page2/l1.png"),
              description:
                "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
              image: require("@/assets/images/page2/center1.png"),
            },
            {
              id: 19,
              name: "OA",
              icon: require("@/assets/images/page2/l2.png"),
              description:
                "办公自动化（OA）是将计算机、通信等现代化技术运用到传统办公方式，进而形成的一种新型办公方式。它利用现代化设备和信息化技术，代替办公人员传统的部分手动或重复性业务活动，优质而高效地处理办公事务和业务信息，实现对信息资源的高效利用，进而达到提高生产率、辅助决策的目的，最大限度地提高工作效率和质量、改善工作环境。办公自动化（OA）是一个企业除了生产控制之外的一切信息处理与管理的集合。",
              image: require("@/assets/images/page2/center2.png"),
            },
            {
              id: 20,
              name: "BI",
              icon: require("@/assets/images/page2/l4.png"),
              description:
                "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
              image: require("@/assets/images/page2/center4.png"),
            },
            {
              id: 21,
              name: "SAP",
              icon: require("@/assets/images/page2/l4.png"),
              description:
                "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
              image: require("@/assets/images/page2/center4.png"),
            },
            {
              id: 22,
              name: "工业大脑",
              icon: require("@/assets/images/page2/l4.png"),
              description:
                "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
              image: require("@/assets/images/page2/center4.png"),
            },
            {
              id: 23,
              name: "钉钉",
              icon: require("@/assets/images/page2/l4.png"),
              description:
                "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
              image: require("@/assets/images/page2/center4.png"),
            },
            {
              id: 24,
              name: "MOM",
              icon: require("@/assets/images/page2/l4.png"),
              description:
                "BI是“商业智能”（Business Intelligence）的缩写。它指的是一套技术、工具和流程，用于收集、分析和呈现企业数据，以帮助决策者从数据中提取有用信息，支持商业决策。BI的核心功能包括：数据收集：从各种来源（如数据库、ERP系统、CRM系统等）收集业务相关数据。数据处理和整合：对收集到的数据进行清洗和整合，确保数据的一致性和准确性。数据分析：使用统计分析、数据挖掘等方法，从数据中识别趋势、模式和洞察。报表和可视化：通过图表、仪表盘等方式将数据可视化，使决策者能够直观理解信息。决策支持：基于分析结果，帮助企业制定策略、优化运营、提高效率。",
              image: require("@/assets/images/page2/center4.png"),
            },
          ],
        },
      ],
      // 默认选中的选项
      selectedItem: {
        name: "ERP系统概述",
        description:
          "ERP系统，全称为企业资源计划系统（Enterprise Resource Planning），是一个集成了企业各项业务流程的综合性管理软件。它不仅涵盖了企业的财务、人力资源、生产、采购、销售等多个部门，还涉及到了供应链管理、客户关系管理等方面。ERP系统的核心思想是通过信息技术与先进的管理思想相结合，为企业提供一个系统化的管理平台，以优化企业的资源配置和业务流程，提高企业的整体运营效率和市场竞争力。",
        image: require("@/assets/images/page2/center1.png"),
      },
      
    };
  },
  methods: {
    // 选择项目时动态更新
    selectItem(item) {
      this.currentActive = item.id
      this.selectedItem = item

    },
  },
};
</script>

<style lang="scss" scoped>
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
  grid-template-columns: 1fr 2fr 1fr;
  /* 左右各1/6，中间2/3 */
  gap: 10px;
  height: 100vh;
  /* 占满整个视口高度 */
}

.left-side {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  z-index: 10;
}

.right-side {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  z-index: 10;
}

.left-item-default {
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 20px;
  height: 2vh;
  color: #59baf2;
  line-height: 30px;
  border: 3px solid transparent;
  border-radius: 40px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #1120419c, #1120419c),
    linear-gradient(90deg, #112041 61%, #2461d1);

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
  font-size: 20px;
  height: 2vh;
  color: #59baf2;
  line-height: 30px;
  border: 3px solid transparent;
  border-radius: 40px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #1120419c, #1120419c),
    linear-gradient(-90deg, #112041 61%, #2461d1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* 改进过渡效果 */
}

.item {
  // flex: 0 0 15px;
  margin-bottom: 5px;
  height: 8px;
}

.item:hover {
  /* 鼠标悬停时背景色 */
  cursor: pointer;
  color: #ffffff;
  /* 字体颜色在悬停时变白 */
  background-image: linear-gradient(to right, #2461d1, #59baf2);
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
  font-size: 20px;
  height: 2vh;
  color: #59baf2;
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
  background-image: linear-gradient(to right, #2461d1, #59baf2);
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
  background-image: url("~@/assets/images/page2/btn-bg.png");
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
  color: #eba14b;
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

.content-title {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  position: absolute;
  top: 17vh;
  left: 43vw;
  width: 15vw;
  height: 6vh;
  background: url("~@/assets/images/page2/title-bg.png") no-repeat;
  background-size: 100% 100%;
}

.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("~@/assets/images/block-bg-1.png") no-repeat;
  background-size: 100% 100%;
  height: 100%; // 使每个块占满行高
  z-index: 1;

  .header {
    width: calc(100% - 6px);
    height: 47px;
    padding-left: 47px;
    background: url("~@/assets/images/block-header-1.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    font-family: PangMenZhengDao;
    font-weight: 400;
    font-size: 28px;
    line-height: 47px;
    color: #ffffff;
  }

  .content {
    flex-direction: column;
    width: 90%;
    height: calc(100% - 47px);
    // padding: 22px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    margin: auto;
  }
}
</style>
