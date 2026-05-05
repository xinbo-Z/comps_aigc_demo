根据用户描述生成规格文档。

## 规则

1. 从用户输入中提取 feature-name（如"订单管理"→ order-management）
2. 输出路径固定为: `specs/$FEATURE_NAME/spec.md`
3. 如果 `specs/$FEATURE_NAME/` 目录已存在:
   - 将已有 spec.md 重命名为 `spec-v<N>.md`（N 自动递增）
   - 在新 spec.md 顶部添加: `> 基于 spec-v<N>.md 更新`
4. 如果目录不存在: `mkdir -p specs/$FEATURE_NAME/`
5. 按照 spec-driven-development 技能的六领域模板生成规格

## 用户输入

$ARGUMENTS
