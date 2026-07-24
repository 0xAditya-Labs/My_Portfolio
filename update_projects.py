import re

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

swiftcache_start = content.find('  {\n    id: "swiftcache"')
isp_start = content.find('  {\n    id: "isp-customer-retention"')
contextiq_start = content.find('  {\n    id: "contextiq"')
portfolio_start = content.find('  {\n    id: "software-engineer-portfolio"')

if -1 in [swiftcache_start, isp_start, contextiq_start, portfolio_start]:
    print('Failed to find start indices')
    exit(1)

swiftcache_text = content[swiftcache_start:isp_start]
isp_text = content[isp_start:contextiq_start]
contextiq_text = content[contextiq_start:portfolio_start]

# 1. Update ContextIQ images
contextiq_text = contextiq_text.replace(
    '    images: [\n      "/projects/contextiq_1.png"\n    ],',
    '    images: [\n      "/projects/contextiq_1.png",\n      "/projects/contextiq_2.png",\n      "/projects/contextiq_3.png",\n      "/projects/contextiq_4.png"\n    ],'
)

# 2. Update ContextIQ documentation architecture
doc_end = contextiq_text.find('    }\n  },')
if doc_end == -1:
    print('Failed to find doc end in ContextIQ')
    exit(1)

contextiq_text = contextiq_text[:doc_end] + ',\n      architecture: "LangGraph ReAct Agent orchestrates tool-gating and query execution. FastAPI handles routing, ChromaDB manages vector storage, and Gemini API powers generation. Full-stack observability is implemented with Langfuse and OpenTelemetry."\n' + contextiq_text[doc_end:]

# Reorder: chatmind -> contextiq -> swiftcache -> isp -> portfolio
new_content = content[:swiftcache_start] + contextiq_text + swiftcache_text + isp_text + content[portfolio_start:]

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated successfully')
