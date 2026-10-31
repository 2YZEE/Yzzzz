import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const BANKS = [
  {
    id: 'a', number: '01', title: 'أساسيات الشبكات', short: 'بنك الشبكات', count: 114,
    description: 'من البروتوكولات والعنونة إلى أمن الشبكات وأوامر IOS ووسائط الاتصال.',
    tags: ['بروتوكولات', 'عنونة IP', 'أمن الشبكات'], color: 'mint', symbol: 'network',
    key: 'nb-known',
  },
  {
    id: 'b', number: '02', title: 'IT Essentials', short: 'IT Essentials', count: 71,
    description: 'مراجعة عملية لمكوّنات الحاسوب والصيانة والتخزين وحل الأعطال.',
    tags: ['العتاد', 'الصيانة', 'حل الأعطال'], color: 'blue', symbol: 'chip',
    key: 'nb-b-known',
  },
  {
    id: 'c', number: '03', title: 'التقييمات الذاتية', short: 'التقييمات الذاتية', count: 45,
    description: 'اختبر فهمك في تسعة تقييمات تشمل أسئلة الاختيار وصواب أو خطأ.',
    tags: ['9 تقييمات', 'اختبار ذاتي', 'IPv6'], color: 'peach', symbol: 'check',
    key: 'nb-c-known',
  },
];
const TOTAL = BANKS.reduce((sum, bank) => sum + bank.count, 0);

const CHAPTERS = [
  { id: 'ch1', n: '01', title: 'الشبكات اليوم', focus: 'ما الذي تربطه الشبكة؟', explanation: 'الشبكة تربط الأجهزة النهائية (Hosts) عبر أجهزة وسيطة ووسائط سلكية أو لاسلكية. تحدد الطوبولوجيا شكل الاتصال؛ وتغطي LAN نطاقًا محليًا، بينما تربط WAN مناطق أبعد. تزداد موثوقية الشبكة بتحمل الأعطال والتوسع وجودة الخدمة والأمن، وتدعم اليوم BYOD والتعاون والفيديو والسحابة.', flow: ['مضيف', 'وسيط', 'مضيف'], points: ['المضيف يرسل ويستقبل · السويتش والموجّه ونقطة الوصول تربط الأجهزة وتدير المسار', 'LAN محلية · WAN واسعة · Internet عامة · Intranet خاصة · Extranet للشركاء', 'الطوبولوجيا تصف الاتصال · Copper وFiber وWi‑Fi تنقل البيانات', 'شبكة موثوقة = تحمّل أعطال + توسّع + QoS + أمن'], tags: ['أجهزة ووسائط', 'طوبولوجيا', 'سحابة وتعاون'], en: { title: 'Networking Today', focus: 'What does a network connect?', explanation: 'A network connects end devices (hosts) through intermediary devices and wired or wireless media. Topology describes how devices are linked; a LAN covers a local area, while a WAN connects distant areas. Reliable networks provide fault tolerance, scalability, quality of service, and security, while supporting BYOD, collaboration, video, and cloud services.', flow: ['Host', 'Intermediary', 'Host'], points: ['Hosts send and receive data; switches, routers, and access points connect devices and manage traffic.', 'LAN is local · WAN spans distance · the Internet is public · an intranet is private · an extranet serves partners.', 'Topology describes connectivity; copper, fiber, and Wi‑Fi carry data.', 'Reliable network = fault tolerance + scalability + QoS + security.'], tags: ['Devices and media', 'Topology', 'Cloud and collaboration'] } },
  { id: 'ch2', n: '02', title: 'تهيئة السويتش والمضيف', focus: 'أعطِ الجهاز هوية وإعدادًا صالحًا.', explanation: 'تهيئة IOS تبدأ بالدخول إلى CLI عبر Console أو اتصال إدارة، ثم التنقل بين أوضاع الأوامر لتسمية الجهاز وتأمينه وضبط الواجهات والعناوين. يعمل running-config في RAM؛ ولحفظ التغييرات بعد إعادة التشغيل تُنسخ إلى startup-config في NVRAM. يمكن إعداد IP للمضيف يدويًا أو عبر DHCP، ويحتاج الوصول البعيد للسويتش إلى عنوان SVI.', flow: ['Switch>', 'enable', 'Switch#', 'conf t'], points: ['Console أو SSH/Telnet للوصول · ? والمساعدة السياقية لاستكشاف الأوامر', 'User EXEC > · Privileged EXEC # · Configuration (config)#', 'Hostname + كلمات مرور + تشفير + Banner للتحذير', 'running-config في RAM · startup-config في NVRAM · HOST يدوي أو DHCP · SVI للإدارة البعيدة'], tags: ['IOS CLI', 'إعداد الواجهات', 'حفظ الإعداد'], en: { title: 'Basic Switch and End Device Configuration', focus: 'Give each device a valid identity and configuration.', explanation: 'Configure IOS through the CLI, reached by console or a management connection, then move through command modes to name and secure the device and configure interfaces and addresses. The running-config is held in RAM; save it to startup-config in NVRAM to keep changes after a reboot. Hosts can use a static address or DHCP, while remote switch management requires an SVI address.', flow: ['Switch>', 'enable', 'Switch#', 'configure terminal'], points: ['Access by console or SSH/Telnet; use ? and context-sensitive help to explore commands.', 'User EXEC > · Privileged EXEC # · Configuration (config)#.', 'Set a hostname, passwords, password encryption, and a warning banner.', 'running-config lives in RAM · startup-config in NVRAM · host IP by DHCP or static · SVI for remote management.'], tags: ['IOS CLI', 'Interface setup', 'Save configuration'] } },
  { id: 'ch3', n: '03', title: 'البروتوكولات والنماذج', focus: 'قواعد مشتركة تجعل الاتصال مفهومًا.', explanation: 'تعمل بروتوكولات الشبكة معًا عبر طبقات: يجهّز التطبيق البيانات، وتنقلها TCP أو UDP، ويضع IP عنوانَي المصدر والوجهة، ثم يحمل Ethernet أو Wi‑Fi الإطار على الوصلة. تنزل البيانات من التطبيق إلى الوسط بالتغليف Data → Segment → Packet → Frame → Bits، ويفك الطرف المستقبل التغليف بالترتيب العكسي. يشرح OSI الوظائف بسبع طبقات، بينما يجمعها TCP/IP في أربع.', flow: ['تطبيق', 'نقل', 'إنترنت', 'وصول'], points: ['تعمل بروتوكولات التطبيقات والنقل وIP وEthernet معًا لإيصال الرسالة', 'OSI: سبع طبقات · TCP/IP: أربع طبقات تعمل معًا كمجموعة بروتوكولات', 'تغليف نزولًا: Data → Segment → Packet → Frame → Bits · وفك التغليف بالعكس', 'IP منطقي بين المصدر والوجهة · MAC محلي بين كل قفزة وجارها'], tags: ['TCP/IP', 'OSI', 'عناوين كل طبقة'], en: { title: 'Protocols and Models', focus: 'Shared rules make communication understandable.', explanation: 'Network protocols work together across layers: the application prepares data, TCP or UDP carries it, IP adds source and destination addresses, and Ethernet or Wi-Fi carries the frame over the link. Data moves down to the medium through encapsulation—Data → Segment → Packet → Frame → Bits—and the receiver de-encapsulates it in reverse. OSI describes seven layers, while TCP/IP groups networking functions into four.', flow: ['Application', 'Transport', 'Internet', 'Access'], points: ['Application, transport, IP, and Ethernet protocols work together to deliver a message.', 'OSI has seven layers; TCP/IP groups related functions into four interoperating layers.', 'Encapsulation down: Data → Segment → Packet → Frame → Bits · de-encapsulation reverses it.', 'IP is logical end-to-end addressing; MAC addressing is local to each link.'], tags: ['TCP/IP', 'OSI', 'Layer addressing'] } },
  { id: 'ch4', n: '04', title: 'الطبقة الفيزيائية', focus: 'حوّل البتات إلى إشارة تعبر وسطًا.', explanation: 'تستقبل الطبقة الفيزيائية إطار ربط البيانات وتحول بتاته إلى إشارات كهربائية في النحاس، أو ضوئية في الألياف، أو كهرومغناطيسية لاسلكية. تحدد المعايير المكوّنات والترميز والإشارات. يعتمد اختيار الوسط والكابل والموصل على المسافة والسرعة والتداخل؛ وBandwidth هي السعة، وThroughput المعدل الفعلي، وLatency زمن التأخير.', flow: ['Bits', 'ترميز', 'إشارة', 'وسط'], points: ['Copper: UTP / STP / Coax · التواء الأسلاك وتقليل التداخل أساس أداء UTP', 'Fiber: Single‑mode للمسافة والسرعة · Multimode للمسارات الأقصر', 'Wi‑Fi والوسائط اللاسلكية تمنح الحركة عبر موجات راديوية', 'Bandwidth سعة · Throughput معدل فعلي · Latency زمن التأخير'], tags: ['UTP / STP / Coax', 'Fiber', 'Wi‑Fi'], en: { title: 'Physical Layer', focus: 'Turn bits into signals that travel across a medium.', explanation: 'The physical layer takes a data-link frame and encodes its bits as electrical signals on copper, light in fiber, or electromagnetic waves over wireless. Standards define physical components, encoding, and signaling. Media and connectors affect distance, speed, and interference. Bandwidth is capacity, throughput is the achieved rate, and latency is delay.', flow: ['Bits', 'Encoding', 'Signal', 'Medium'], points: ['Copper: UTP / STP / coax · twisted pairs help reduce interference in UTP.', 'Fiber: single-mode supports longer, high-bandwidth links; multimode suits shorter paths.', 'Wi‑Fi and other wireless media provide mobility using radio waves.', 'Bandwidth = capacity · throughput = actual rate · latency = delay.'], tags: ['UTP / STP / Coax', 'Fiber', 'Wi‑Fi'] } },
  { id: 'ch5', n: '05', title: 'أنظمة الأعداد', focus: 'غيّر شكل الرقم؛ القيمة نفسها.', explanation: 'تُمثَّل القيمة نفسها بالعشري (أساس 10) أو الثنائي (أساس 2) أو الست عشري (أساس 16). تعتمد قيمة الخانة على موضعها وقوة الأساس. عنوان IPv4 يتكوّن من 32 بتًا في أربعة Octets، وكل خانة Hex تمثل 4 بتات؛ لذلك يسهّل Hex قراءة مجموعات البتات.', flow: ['Decimal', 'Binary', 'Hex'], points: ['قيمة كل خانة = الرقم × قوة الأساس حسب موضعه', 'IPv4 = 32 بتًا = 4 Octets، كل منها 8 بتات', '4 bits = خانة Hex · IPv6 = 128 بتًا = 32 خانة Hex'], tags: ['تحويل عشري ↔ ثنائي', 'تحويل ثنائي ↔ Hex', 'قراءة عناوين IP'], en: { title: 'Number Systems', focus: 'Change how a number is written; its value stays the same.', explanation: 'The same value can be written in decimal (base 10), binary (base 2), or hexadecimal (base 16). A digit’s value depends on its position and the base. An IPv4 address has 32 bits in four octets; each hexadecimal digit represents four bits, making hex a compact way to read bit groups.', flow: ['Decimal', 'Binary', 'Hex'], points: ['Digit value = digit × the base raised to its position.', 'IPv4 = 32 bits = four octets of 8 bits each.', '4 bits = 1 hex digit · IPv6 = 128 bits = 32 hex digits.'], tags: ['Decimal ↔ binary', 'Binary ↔ hex', 'Read IP addresses'] } },
  { id: 'ch6', n: '06', title: 'طبقة ربط البيانات', focus: 'سلّم الإطار إلى الجهاز المجاور على الوصلة.', explanation: 'تحوّل طبقة ربط البيانات حزمة الطبقة الثالثة إلى إطار مناسب للوصلة الحالية، وتدير الاتصال بين واجهتي الشبكة المتجاورتين. LLC يعرّف بروتوكول الطبقة العليا، وMAC ينظم الإطار والعنوان المحلي والوصول إلى الوسط. يتغير الإطار ونوع الوصلة عند كل قفزة، بينما يحدد نوع الوسط والطوبولوجيا أسلوب الوصول.', flow: ['MAC وجهة', 'بيانات', 'FCS'], points: ['Frame = Header + Payload + Trailer · FCS يساعد على اكتشاف تلف الإطار', 'LLC يحدد بروتوكول الطبقة العليا · MAC يتولى العنونة والوصول للوسط', 'Half‑duplex يتناوب · Full‑duplex يرسل ويستقبل بالتزامن', 'CSMA/CD لإيثرنت نصف المزدوج القديمة · CSMA/CA لشبكات Wi‑Fi'], tags: ['Frame', 'LAN / WAN', 'CSMA/CD · CSMA/CA'], en: { title: 'Data Link Layer', focus: 'Deliver a frame to the neighboring device on the link.', explanation: 'The data-link layer encapsulates a network-layer packet in a frame suited to the current link and manages communication between neighboring network interfaces. LLC identifies the upper-layer protocol; MAC handles framing, local addressing, and media access. The frame and link protocol can change at every hop.', flow: ['Destination MAC', 'Payload', 'FCS'], points: ['Frame = header + payload + trailer; FCS helps detect a damaged frame.', 'LLC identifies the upper-layer protocol; MAC handles addressing and media access.', 'Half-duplex takes turns; full-duplex sends and receives simultaneously.', 'Legacy shared Ethernet used CSMA/CD; Wi‑Fi uses CSMA/CA.'], tags: ['Frame', 'LAN / WAN', 'CSMA/CD · CSMA/CA'] } },
  { id: 'ch7', n: '07', title: 'تحويل Ethernet', focus: 'السويتش يتعلم عناوين MAC ويختار المنفذ.', explanation: 'إيثرنت عائلة تقنيات تعمل في طبقتي ربط البيانات والفيزيائية. يتعلم السويتش عنوان المصدر والمنفذ، ثم يبحث عن MAC الوجهة: يمرّر الوجهة المعروفة إلى منفذها، ويرشّح الإطار إذا كانت على المنفذ نفسه، ويغمر المجهول أو Broadcast في بقية المنافذ. يحدد نوع الإطار أيضًا من يستقبله: جهاز واحد أو مجموعة أو كل الأجهزة.', flow: ['تعلّم المصدر', 'ابحث عن الوجهة', 'مرّر / رشّح / أغمر'], points: ['MAC = 48 بتًا = 12 خانة Hex · Unicast / Multicast / Broadcast', 'معروف: يمرر للمنفذ المناسب · على منفذ الدخول: يرشّح · مجهول: يغمر', 'إطار Ethernet المعتاد 64–1518 بايتًا', 'Store‑and‑forward يفحص الإطار · Cut‑through يبدأ قبل استقباله كاملًا'], tags: ['MAC table', 'Unicast / Broadcast / Multicast', 'Switch forwarding'], en: { title: 'Ethernet Switching', focus: 'A switch learns MAC addresses and selects an output port.', explanation: 'Ethernet spans the data-link and physical layers. A switch learns the source MAC address and incoming port, then looks up the destination: it forwards a known destination to its port, filters a frame when the destination is on the incoming port, and floods unknown unicast or broadcast frames to other ports. MAC frame types reach one device, a group, or all devices.', flow: ['Learn source', 'Look up destination', 'Forward / filter / flood'], points: ['MAC = 48 bits = 12 hex digits · unicast / multicast / broadcast.', 'Known destination: forward to its port · same incoming port: filter · unknown: flood.', 'Typical Ethernet frame size is 64–1518 bytes.', 'Store-and-forward checks the whole frame; cut-through starts forwarding before full receipt.'], tags: ['MAC table', 'Unicast / Broadcast / Multicast', 'Switch forwarding'] } },
  { id: 'ch8', n: '08', title: 'طبقة الشبكة', focus: 'وجّه الحزمة من شبكة إلى شبكة.', explanation: 'تضيف طبقة الشبكة عنواني IP للمصدر والوجهة وتوجّه الحزمة عبر شبكات متعددة. IP عديم الاتصال، Best Effort ومستقل عن الوسط؛ لا يضمن التسليم ولا يعيد الإرسال. يحدد المضيف محلية الوجهة باستخدام عنوانه وقناع الشبكة: يرسل محليًا مباشرة أو إلى البوابة الافتراضية. يختار الموجّه أفضل مسار من جدول التوجيه.', flow: ['IP المصدر', 'Routing', 'IP الوجهة'], points: ['IP: Connectionless + Best Effort + Media Independent', 'المضيف يقارن الشبكة والقناع · الوجهة البعيدة تذهب إلى Default Gateway', 'الموجّه يختار أفضل مسار: Connected أو Static أو Dynamic أو Default', 'رأس IPv4 يضم المصدر والوجهة وTTL وProtocol · IPv6 = 128 بت ورأس أساسي ثابت 40 بايت'], tags: ['IPv4 / IPv6', 'Packet', 'Routing table'], en: { title: 'Network Layer', focus: 'Route a packet from one network to another.', explanation: 'The network layer adds source and destination IP addresses and routes packets across interconnected networks. IP is connectionless, best-effort, and media-independent; it does not guarantee delivery or retransmit lost packets. A host compares the destination with its own address and mask: it sends locally or uses the default gateway. Routers select a route from their routing tables.', flow: ['Source IP', 'Routing', 'Destination IP'], points: ['IP is connectionless, best-effort, and media-independent.', 'The host checks its network and mask; remote destinations go to the default gateway.', 'Routers select among connected, static, dynamic, or default routes.', 'The IPv4 header includes source, destination, TTL, and protocol · IPv6 uses 128-bit addresses and a fixed 40-byte base header.'], tags: ['IPv4 / IPv6', 'Packet', 'Routing table'] } },
  { id: 'ch9', n: '09', title: 'حلّ العناوين', focus: 'اعثر على MAC المطلوب للتسليم المحلي.', explanation: 'يحدد IP الوجهة النهائية منطقيًا، بينما يحتاج الإطار إلى MAC للجار على الوصلة الحالية. إذا كانت الوجهة في الشبكة المحلية يُستخدم MAC الجهاز نفسه، وإذا كانت بعيدة يُستخدم MAC البوابة مع بقاء IP الوجهة النهائية. يكتشف ARP عنوان MAC المقابل لـ IPv4، ويؤدي Neighbor Discovery الوظيفة في IPv6 ويشمل اكتشاف الموجّهات.', flow: ['IP معروف', 'ARP / ND', 'MAC معروف'], points: ['محلي: MAC الجهاز المقصود · بعيد: MAC البوابة التالية، مع ثبات IP الوجهة', 'ARP Request بث محلي · Reply يعيد MAC ويُحفظ مؤقتًا في ARP cache', 'الطلبات تُبث ويمكن انتحال الردود؛ مراقبة ARP مهمة للأمن', 'IPv6 ND: رسائل NS/NA لحل العنوان · RS/RA لاكتشاف الموجّه'], tags: ['ARP Request / Reply', 'NS / NA · RS / RA', 'ARP cache'], en: { title: 'Address Resolution', focus: 'Find the MAC address needed for local delivery.', explanation: 'IP identifies the final destination logically, while each link-layer frame needs the MAC address of its neighbor on the current link. For a local destination, that is the destination host; for a remote one, it is the default gateway, while the final destination IP stays unchanged. ARP resolves IPv4 to a MAC address; IPv6 Neighbor Discovery also supports router discovery.', flow: ['IP known', 'ARP / ND', 'MAC known'], points: ['Local destination: its MAC · remote destination: next-hop gateway MAC; destination IP stays the same.', 'ARP Request is broadcast locally; Reply returns a MAC that is cached temporarily.', 'Requests are broadcast and replies can be spoofed, so ARP security matters.', 'IPv6 ND uses NS/NA for address resolution and RS/RA for router discovery.'], tags: ['ARP Request / Reply', 'NS / NA · RS / RA', 'ARP cache'] } },
];

const CHAPTER_VISUALS = {
  ch1: { ar: { heading: 'أهم صورة ذهنية', cards: [
    { title: 'مسار الرسالة', type: 'flow', items: ['مضيف مرسل', 'سويتش / موجّه', 'مضيف مستقبِل'] },
    { title: 'أركان الشبكة الموثوقة', type: 'tiles', items: [['تحمّل الأعطال', 'مسارات بديلة'], ['قابلية التوسع', 'تستوعب نمو المستخدمين'], ['جودة الخدمة QoS', 'أولوية للصوت والفيديو'], ['الأمن', 'حماية الأجهزة والبيانات']] },
  ] }, en: { heading: 'The essential picture', cards: [
    { title: 'Message path', type: 'flow', items: ['Source host', 'Switch / router', 'Destination host'] },
    { title: 'Four pillars of a reliable network', type: 'tiles', items: [['Fault tolerance', 'Alternate paths'], ['Scalability', 'Grows with users'], ['Quality of service', 'Prioritizes voice and video'], ['Security', 'Protects devices and data']] },
  ] } },
  ch2: { ar: { heading: 'إعداد الجهاز باختصار', cards: [
    { title: 'سُلّم أوضاع IOS', type: 'flow', items: ['Switch>', 'enable', 'Switch#', 'configure terminal'] },
    { title: 'أين تحفظ الإعدادات؟', type: 'compare', items: [['running-config', 'RAM · الإعداد الحالي'], ['startup-config', 'NVRAM · يستمر بعد إعادة التشغيل']] },
    { title: 'إدارة السويتش عن بُعد', type: 'flow', items: ['SVI', 'عنوان IP + قناع', 'no shutdown', 'SSH'] },
  ] }, en: { heading: 'Device configuration at a glance', cards: [
    { title: 'IOS mode ladder', type: 'flow', items: ['Switch>', 'enable', 'Switch#', 'configure terminal'] },
    { title: 'Where configuration lives', type: 'compare', items: [['running-config', 'RAM · active settings'], ['startup-config', 'NVRAM · survives reboot']] },
    { title: 'Remote switch management', type: 'flow', items: ['SVI', 'IP address + mask', 'no shutdown', 'SSH'] },
  ] } },
  ch3: { ar: { heading: 'رسومات المنهج الأساسية', cards: [
    { title: 'داخل حزمة IP', type: 'packet', items: [['عنوان IP المصدر', 'جهاز الإرسال · ثابت عبر المسار'], ['عنوان IP الوجهة', 'المستقبِل النهائي · ثابت عبر المسار'], ['البيانات', 'حمولة الحزمة']] },
    { title: 'خيارات تسليم الرسالة', type: 'tiles', items: [['Unicast', 'واحد إلى واحد'], ['Multicast', 'واحد إلى مجموعة محددة'], ['Broadcast', 'واحد إلى الجميع · في IPv4']] },
    { title: 'TCP/IP: من التطبيق إلى الوسط', type: 'stack', items: [['Application', 'HTTP · DNS', 'Data'], ['Transport', 'TCP: Segment · UDP: Datagram', 'Segment / Datagram'], ['Internet', 'IPv4 · IPv6', 'Packet'], ['Network Access', 'Ethernet · Wi‑Fi', 'Frame → Bits']] },
    { title: 'التغليف والإرسال والاستقبال', type: 'flow', items: ['بيانات التطبيق', 'تغليف نزولًا', 'الشبكة تنقل الحزمة', 'فك تغليف صعودًا', 'تطبيق المستقبِل'] },
    { title: 'مطابقة النموذجين', type: 'compare', items: [['OSI: 7 طبقات', 'Application · Presentation · Session'], ['TCP/IP: Application', 'يجمع وظائف OSI 7–5'], ['TCP/IP: Transport', 'يقابل OSI 4'], ['TCP/IP: Internet + Access', 'يقابل OSI 3 ثم 2–1']] },
  ] }, en: { heading: 'The key diagrams from the chapter', cards: [
    { title: 'Inside an IP packet', type: 'packet', items: [['Source IP address', 'Sending host · unchanged across the route'], ['Destination IP address', 'Final receiver · unchanged across the route'], ['Data', 'Packet payload']] },
    { title: 'Message delivery options', type: 'tiles', items: [['Unicast', 'One to one'], ['Multicast', 'One to a selected group'], ['Broadcast', 'One to all · IPv4']] },
    { title: 'TCP/IP: application to medium', type: 'stack', items: [['Application', 'HTTP · DNS', 'Data'], ['Transport', 'TCP: Segment · UDP: Datagram', 'Segment / Datagram'], ['Internet', 'IPv4 · IPv6', 'Packet'], ['Network Access', 'Ethernet · Wi‑Fi', 'Frame → Bits']] },
    { title: 'Encapsulate, send, and receive', type: 'flow', items: ['Application data', 'Encapsulate down', 'Network carries packet', 'De-encapsulate up', 'Receiving application'] },
    { title: 'Mapping the two models', type: 'compare', items: [['OSI: 7 layers', 'Application · Presentation · Session'], ['TCP/IP: Application', 'Groups OSI layers 7–5'], ['TCP/IP: Transport', 'Maps to OSI 4'], ['TCP/IP: Internet + Access', 'Maps to OSI 3 and 2–1']] },
  ] } },
  ch4: { ar: { heading: 'من الإطار إلى الإشارة', cards: [
    { title: 'وظيفة الطبقة الفيزيائية', type: 'flow', items: ['Frame', 'ترميز البتات', 'إشارة', 'وسط النقل'] },
    { title: 'اختر الوسط', type: 'tiles', items: [['نحاس · UTP', 'نبضات كهربائية · مسافات قصيرة'], ['ألياف · Fiber', 'نبضات ضوئية · مسافة أبعد'], ['لاسلكي · Wi‑Fi', 'موجات راديوية · حركة أكبر']] },
    { title: 'نوعا الألياف', type: 'compare', items: [['Single-mode', 'مسافات طويلة · مسار ضوئي واحد'], ['Multimode', 'مسافات أقصر · مسارات ضوئية متعددة']] },
  ] }, en: { heading: 'From frame to signal', cards: [
    { title: 'Physical layer function', type: 'flow', items: ['Frame', 'Encode bits', 'Signal', 'Transmission medium'] },
    { title: 'Choose the medium', type: 'tiles', items: [['Copper · UTP', 'Electrical pulses · shorter runs'], ['Fiber', 'Light pulses · longer distance'], ['Wireless · Wi‑Fi', 'Radio waves · greater mobility']] },
    { title: 'Two fiber types', type: 'compare', items: [['Single-mode', 'Long distance · one light path'], ['Multimode', 'Shorter distance · multiple paths']] },
  ] } },
  ch5: { ar: { heading: 'الأرقام كما تراها الشبكة', cards: [
    { title: 'عنوان IPv4 واحد، ثلاث كتابات', type: 'flow', items: ['192.168.11.10', '11000000.10101000.00001011.00001010', 'C0.A8.0B.0A'] },
    { title: 'مفاتيح التحويل', type: 'tiles', items: [['IPv4', '32 بت · 4 خانات × 8 بت'], ['IPv6', '128 بت · 32 خانة Hex'], ['Hex', 'كل خانة = 4 بت · A–F تمثل 10–15']] },
  ] }, en: { heading: 'Numbers as the network sees them', cards: [
    { title: 'One IPv4 address, three notations', type: 'flow', items: ['192.168.11.10', '11000000.10101000.00001011.00001010', 'C0.A8.0B.0A'] },
    { title: 'Conversion keys', type: 'tiles', items: [['IPv4', '32 bits · 4 octets × 8 bits'], ['IPv6', '128 bits · 32 hex digits'], ['Hex', 'Each digit = 4 bits · A–F represent 10–15']] },
  ] } },
  ch6: { ar: { heading: 'الإطار والوصلة المجاورة', cards: [
    { title: 'شكل إطار الطبقة الثانية', type: 'frame', items: [['Header', 'MAC الوجهة + المصدر'], ['Payload', 'Packet'], ['Trailer', 'FCS · اكتشاف الخطأ']] },
    { title: 'من الحزمة إلى إطار الوصلة', type: 'flow', items: ['Packet', 'إضافة ترويسة MAC', 'Frame', 'إرسال للجار'] },
    { title: 'تقسيم العمل', type: 'compare', items: [['LLC', 'يربط برمجيات الطبقات العليا بالعتاد'], ['MAC', 'التغليف والعنوان المحلي والوصول للوسط']] },
    { title: 'الاتجاه والتحكم بالوسط', type: 'tiles', items: [['Half-duplex', 'اتجاه واحد في اللحظة · Wi‑Fi'], ['Full-duplex', 'إرسال واستقبال معًا · السويتش'], ['CSMA/CD', 'كشف التصادم · Ethernet قديم'], ['CSMA/CA', 'تجنّب التصادم · Wi‑Fi']] },
  ] }, en: { heading: 'Frames and the neighboring link', cards: [
    { title: 'Layer 2 frame format', type: 'frame', items: [['Header', 'Destination + source MAC'], ['Payload', 'Packet'], ['Trailer', 'FCS · error detection']] },
    { title: 'Packet to a link frame', type: 'flow', items: ['Packet', 'Add MAC header', 'Frame', 'Send to neighbor'] },
    { title: 'Split responsibilities', type: 'compare', items: [['LLC', 'Connects upper-layer software to hardware'], ['MAC', 'Encapsulation, local address, media access']] },
    { title: 'Direction and media access', type: 'tiles', items: [['Half-duplex', 'One direction at a time · Wi‑Fi'], ['Full-duplex', 'Send and receive together · switches'], ['CSMA/CD', 'Detect collisions · legacy Ethernet'], ['CSMA/CA', 'Avoid collisions · Wi‑Fi']] },
  ] } },
  ch7: { ar: { heading: 'كيف يقرر السويتش؟', cards: [
    { title: 'تعلّم ثم تحويل الإطار', type: 'flow', items: ['اقرأ MAC المصدر', 'سجّل MAC + منفذ الدخول', 'ابحث عن MAC الوجهة', 'مرّر · رشّح · أغمر'] },
    { title: 'قرار منفذ الخروج', type: 'tiles', items: [['وجهة معروفة', 'إرسال لمنفذها فقط'], ['الوجهة على منفذ الدخول', 'ترشيح الإطار'], ['وجهة مجهولة', 'إغراق لبقية المنافذ'], ['MAC', '48 بت · 12 خانة Hex']] },
    { title: 'أسلوبا التحويل', type: 'compare', items: [['Store-and-forward', 'يستقبل الإطار كاملًا ويفحص CRC'], ['Cut-through', 'يبدأ بعد قراءة عنوان الوجهة']] },
  ] }, en: { heading: 'How a switch makes its decision', cards: [
    { title: 'Learn, then forward', type: 'flow', items: ['Read source MAC', 'Record MAC + ingress port', 'Look up destination MAC', 'Forward · filter · flood'] },
    { title: 'Choose an output port', type: 'tiles', items: [['Known destination', 'Send to its port'], ['Destination on ingress port', 'Filter the frame'], ['Unknown destination', 'Flood other ports'], ['MAC', '48 bits · 12 hex digits']] },
    { title: 'Two forwarding methods', type: 'compare', items: [['Store-and-forward', 'Receives the whole frame and checks CRC'], ['Cut-through', 'Starts after reading the destination']] },
  ] } },
  ch8: { ar: { heading: 'من شبكة إلى شبكة', cards: [
    { title: 'مسار الحزمة', type: 'flow', items: ['IP المصدر', 'الموجّه يختار المسار', 'الموجّه التالي', 'IP الوجهة النهائية'] },
    { title: 'ما الذي يتغيّر في كل قفزة؟', type: 'compare', items: [['IP المصدر والوجهة', 'يبقيان عنوانَي الطرفين'], ['MAC المصدر والوجهة', 'يتبدلان حسب الوصلة والجار التالي']] },
    { title: 'قرار المضيف قبل الإرسال', type: 'flow', items: ['قارن IP الوجهة بالقناع', 'شبكة محلية: أرسل مباشرة', 'شبكة بعيدة: أرسل إلى البوابة'] },
    { title: 'مصادر المسارات', type: 'tiles', items: [['Connected', 'شبكة موصولة مباشرة'], ['Static', 'يضيفها المسؤول يدويًا'], ['Dynamic', 'يتعلمها الموجّه'], ['Default', 'مسار عند غياب تطابق أدق']] },
  ] }, en: { heading: 'Across interconnected networks', cards: [
    { title: 'Packet route', type: 'flow', items: ['Source IP', 'Router selects a route', 'Next router', 'Final destination IP'] },
    { title: 'What changes at each hop?', type: 'compare', items: [['Source and destination IP', 'Remain the end-to-end addresses'], ['Source and destination MAC', 'Change for each link and next hop']] },
    { title: 'Host decision before sending', type: 'flow', items: ['Compare destination IP to mask', 'Local network: send directly', 'Remote network: send to gateway'] },
    { title: 'Where routes come from', type: 'tiles', items: [['Connected', 'Directly attached network'], ['Static', 'Manually configured'], ['Dynamic', 'Learned by routers'], ['Default', 'Used when no specific route matches']] },
  ] } },
  ch9: { ar: { heading: 'اعثر على عنوان الجار', cards: [
    { title: 'نفس الشبكة أم شبكة بعيدة؟', type: 'compare', items: [['وجهة محلية', 'IP الوجهة + MAC الجهاز الهدف'], ['وجهة بعيدة', 'IP الوجهة النهائي + MAC البوابة المحلية']] },
    { title: 'حل عنوان IPv4', type: 'flow', items: ['IP معروف', 'ARP Request · بث محلي', 'ARP Reply · MAC', 'حفظ مؤقت في ARP cache'] },
    { title: 'رسائل IPv6 Neighbor Discovery', type: 'tiles', items: [['NS → NA', 'حل عنوان الجهاز إلى MAC'], ['RS → RA', 'اكتشاف الموجّه'], ['تنبيه أمني', 'ARP spoofing قد يزوّر الرد']] },
  ] }, en: { heading: 'Find the neighbor’s address', cards: [
    { title: 'Same network or remote network?', type: 'compare', items: [['Local destination', 'Destination IP + target host MAC'], ['Remote destination', 'Final destination IP + local gateway MAC']] },
    { title: 'Resolve an IPv4 address', type: 'flow', items: ['IP is known', 'ARP Request · local broadcast', 'ARP Reply · MAC', 'Temporarily cache the result'] },
    { title: 'IPv6 Neighbor Discovery messages', type: 'tiles', items: [['NS → NA', 'Resolve neighbor address to MAC'], ['RS → RA', 'Discover a router'], ['Security', 'ARP spoofing can forge replies']] },
  ] } },
};

function ChapterDetailVisuals({ chapterId, lang }) {
  const content = CHAPTER_VISUALS[chapterId]?.[lang];
  if (!content) return null;
  return (
    <section className="chapter-detail-visuals" aria-label={content.heading}>
      <div className="detail-visual-heading"><span className="detail-visual-mark"><Icon name="network" size={15}/></span><div><small>{lang === 'en' ? 'FROM THE COURSE' : 'من المنهج'}</small><h3>{content.heading}</h3></div></div>
      <div className={`detail-visual-grid detail-grid-${chapterId}`}>
        {content.cards.map((card, index) => <article className={`detail-visual-card visual-${card.type}`} key={`${chapterId}-${index}`}>
          <h4><i>{String(index + 1).padStart(2, '0')}</i>{card.title}</h4>
          {card.type === 'flow' && <div className="detail-flow" dir="ltr">{card.items.map((item, i) => <React.Fragment key={item}><span>{item}</span>{i < card.items.length - 1 && <b aria-hidden="true">→</b>}</React.Fragment>)}</div>}
          {card.type === 'tiles' && <div className="detail-tiles">{card.items.map(([title, text]) => <div className="detail-tile" key={title}><b>{title}</b><span>{text}</span></div>)}</div>}
          {card.type === 'compare' && <div className="detail-compare">{card.items.map(([title, text]) => <div className="detail-compare-row" key={title}><b>{title}</b><span>{text}</span></div>)}</div>}
          {card.type === 'packet' && <div className="packet-visual" dir="ltr"><div className="packet-addresses">{card.items.slice(0, 2).map(([title, text]) => <div className="packet-field" key={title}><small>{title}</small><b>{text}</b></div>)}</div><div className="packet-payload"><b>{card.items[2][0]}</b><span>{card.items[2][1]}</span></div></div>}
          {card.type === 'stack' && <div className="detail-stack" dir="ltr">{card.items.map(([layer, protocols, pdu], i) => <div className={`detail-stack-row stack-row-${i + 1}`} key={layer}><b className="stack-layer-num">{String(i + 1).padStart(2, '0')}</b><div><strong>{layer}</strong><small>{protocols}</small></div><span>{pdu}</span></div>)}</div>}
          {card.type === 'frame' && <div className="frame-visual" dir="ltr">{card.items.map(([title, text], i) => <div className={`frame-part frame-part-${i + 1}`} key={title}><b>{title}</b><span>{text}</span></div>)}</div>}
        </article>)}
      </div>
    </section>
  );
}

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    moon: <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8m-8 4h8"/></>,
    network: <><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4m-7 4v-2h14v2M5 14h14"/></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><path d="M10 10h4v4h-4z"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    language: <><path d="M3 5h12M9 3v2m4 0c-1 4-4 7-8 9m2-6c1.5 2.3 4 4 7 5"/><path d="m14 20 3-7 3 7m-5.2-2h4.4"/></>,
    hub: <><circle cx="12" cy="12" r="2.2"/><circle cx="5" cy="5" r="1.7"/><circle cx="19" cy="5" r="1.7"/><circle cx="5" cy="19" r="1.7"/><circle cx="19" cy="19" r="1.7"/><path d="m10.4 10.4-4.2-4.2m7.4 4.2 4.2-4.2m-7.4 7.4-4.2 4.2m7.4-4.2 4.2 4.2"/></>,
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function readSaved(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); }
}
function readRoute() {
  if (window.location.hash === '#/summary') return 'summary';
  const match = window.location.hash.match(/^#\/bank\/([abc])$/);
  return match ? match[1] : 'home';
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('hub-theme') || 'light'; } catch { return 'light'; }
  });
  const [progress, setProgress] = useState(() => Object.fromEntries(BANKS.map(bank => [bank.id, readSaved(bank.key).size])));
  const [mobileNav, setMobileNav] = useState(false);
  const activeBank = BANKS.find(bank => bank.id === route);
  const isSummary = route === 'summary';
  const completed = Object.values(progress).reduce((sum, value) => sum + value, 0);
  const overall = Math.min(100, Math.round((completed / TOTAL) * 100));

  useEffect(() => {
    const syncRoute = () => { setRoute(readRoute()); setMobileNav(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', syncRoute);
    const syncProgress = () => setProgress(Object.fromEntries(BANKS.map(bank => [bank.id, readSaved(bank.key).size])));
    window.addEventListener('storage', syncProgress);
    const onFocus = () => syncProgress();
    window.addEventListener('focus', onFocus);
    return () => { window.removeEventListener('hashchange', syncRoute); window.removeEventListener('storage', syncProgress); window.removeEventListener('focus', onFocus); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('hub-theme', theme); } catch { /* storage may be disabled */ }
  }, [theme]);

  useEffect(() => {
    document.title = activeBank ? `${activeBank.short} — مركز المذاكرة` : isSummary ? 'خريطة منهج الشبكات — مركز المذاكرة' : 'مركز المذاكرة — تعلّم بتركيز';
  }, [activeBank, isSummary]);

  useEffect(() => {
    if (!activeBank) return;
    try {
      const frame = document.querySelector('.bank-frame-wrap iframe');
      if (frame?.contentDocument?.documentElement) frame.contentDocument.documentElement.dataset.theme = theme;
    } catch { /* frame remains usable if browser access is restricted */ }
  }, [activeBank, theme]);

  const toggleTheme = () => setTheme(value => value === 'dark' ? 'light' : 'dark');
  const refreshProgress = () => setProgress(Object.fromEntries(BANKS.map(bank => [bank.id, readSaved(bank.key).size])));

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#/" aria-label="مركز المذاكرة، الرئيسية" onClick={() => setMobileNav(false)}>
            <span className="brand-mark"><Icon name="hub" size={22}/></span>
            <span className="brand-copy"><b>مركز المذاكرة</b><small>STUDY HUB</small></span>
          </a>
          <button className="mobile-menu icon-button" aria-label="فتح القائمة" aria-expanded={mobileNav} onClick={() => setMobileNav(v => !v)}><Icon name="menu"/></button>
          <nav className={`main-nav ${mobileNav ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
            <a className={route === 'home' ? 'active' : ''} href="#/" onClick={() => setMobileNav(false)}>الرئيسية</a>
            <a href="#/summary" className={isSummary ? 'active' : ''} onClick={() => setMobileNav(false)}>خريطة المنهج</a>
            <a href="#/bank/a" className={route === 'a' ? 'active' : ''} onClick={() => setMobileNav(false)}>بنوك الأسئلة</a>
            <a href="#/bank/c" className={route === 'c' ? 'active' : ''} onClick={() => setMobileNav(false)}>التقييمات</a>
          </nav>
          <div className="top-actions">
            <span className="saved-total"><span className="status-dot"/> {completed} محفوظة</span>
            <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}><Icon name={theme === 'dark' ? 'sun' : 'moon'}/></button>
          </div>
        </div>
      </header>

      {activeBank ? (
        <main className="bank-page">
          <div className="bank-toolbar">
            <a href="#/" className="back-link"><Icon name="arrow" size={17}/> العودة إلى المكتبة</a>
            <span className={`bank-badge ${activeBank.color}`}><i/> {activeBank.title}</span>
            <span className="toolbar-progress">{progress[activeBank.id]} من {activeBank.count} محفوظ</span>
          </div>
          <div className="bank-frame-wrap">
            <iframe key={activeBank.id} title={activeBank.title} src={`./banks/${activeBank.id}.html`} onLoad={() => {
              refreshProgress();
              try {
                const frame = document.querySelector('.bank-frame-wrap iframe');
                if (frame?.contentDocument?.documentElement) frame.contentDocument.documentElement.dataset.theme = theme;
              } catch { /* frame remains usable if browser access is restricted */ }
            }}/>
          </div>
        </main>
      ) : isSummary ? (
        <SummaryPage/>
      ) : (
        <>
          <main className="home-page">
            <div className="content-wrap">
              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow"><span className="eyebrow-line"/> مساحة هادئة للتعلّم والتقدّم</div>
                  <h1>خطوة صغيرة،<br/><span>فهم أكبر.</span></h1>
                  <p>راجع أساسيات الشبكات والحاسوب بأسلوب واضح. اختر بنكك، اختبر نفسك، وتابع ما أنجزته في مكان واحد.</p>
                  <div className="hero-actions">
                    <a href="#/bank/a" className="button-primary">ابدأ المذاكرة <Icon name="arrow" size={18}/></a>
                    <span className="hero-caption"><Icon name="clock" size={16}/> تقدّمك محفوظ تلقائيًا</span>
                  </div>
                  <div className="hero-stats" aria-label="إحصائيات المنصة">
                    <div><b>{TOTAL}</b><span>سؤالًا</span></div><i/>
                    <div><b>3</b><span>بنوك</span></div><i/>
                    <div><b>23</b><span>محورًا</span></div>
                  </div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
                  <div className="art-grid"/>
                  <div className="network-node node-center"><Icon name="network" size={36}/></div>
                  <div className="network-node node-a"><span>IP</span></div>
                  <div className="network-node node-b"><Icon name="chip" size={22}/></div>
                  <div className="network-node node-c"><Icon name="check" size={22}/></div>
                  <div className="art-connector connector-a"/><div className="art-connector connector-b"/><div className="art-connector connector-c"/>
                  <div className="floating-note note-top"><span className="note-icon"><Icon name="spark" size={17}/></span><span><b>تعلّم بذكاء</b><small>سؤال · إجابة · خلاصة</small></span></div>
                  <div className="floating-note note-bottom"><div className="mini-progress"><i style={{width: `${overall}%`}}/></div><span><b>{overall}%</b><small>من رحلتك</small></span></div>
                  <span className="art-caption">LEARN · PRACTICE · GROW</span>
                </div>
              </section>

              <section className="library-section" aria-labelledby="library-title">
                <div className="section-heading">
                  <div><span className="section-kicker">مكتبتك</span><h2 id="library-title">اختر مسار المراجعة</h2></div>
                  <div className="library-total"><span className="status-dot"/>{completed} / {TOTAL} سؤالًا محفوظًا</div>
                </div>
                <div className="bank-grid">
                  {BANKS.map(bank => <BankCard key={bank.id} bank={bank} saved={progress[bank.id] || 0}/ >)}
                </div>
              </section>

              <section className="study-strip" aria-label="طريقة الاستخدام">
                <div className="strip-intro"><span className="strip-icon"><Icon name="spark" size={19}/></span><div><b>خطتك بسيطة</b><span>تعلّم على وتيرتك، وارجع وقتما تريد.</span></div></div>
                <div className="step"><b>01</b><span><strong>راجع</strong><small>افهم الفكرة والخلاصة</small></span></div>
                <div className="step"><b>02</b><span><strong>اختبر</strong><small>جرّب قبل كشف الإجابة</small></span></div>
                <div className="step"><b>03</b><span><strong>تقدّم</strong><small>احفظ ما أتقنته</small></span></div>
              </section>
              <footer className="footer"><span>مركز المذاكرة <i>·</i> مساحة تعلّمك</span><span className="credit">Built by <b>Yazeed Hamed</b></span></footer>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

function BankCard({ bank, saved }) {
  const progress = Math.min(100, Math.round((saved / bank.count) * 100));
  return (
    <article className={`bank-card ${bank.color}`}>
      <div className="card-topline"><span className="card-index">{bank.number}</span><span className="card-icon"><Icon name={bank.symbol} size={23}/></span></div>
      <a className="card-main" href={`#/bank/${bank.id}`} aria-label={`افتح ${bank.title}`}>
        <h3>{bank.title}</h3><p>{bank.description}</p>
      </a>
      <div className="tag-list">{bank.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="card-progress">
        <div className="progress-label"><span>تقدّمك</span><b>{saved}<small> / {bank.count}</small></b></div>
        <div className="progress-track" role="progressbar" aria-label={`التقدم في ${bank.title}`} aria-valuemin="0" aria-valuemax={bank.count} aria-valuenow={saved}><i style={{width: `${progress}%`}}/></div>
      </div>
      <a className="card-link" href={`#/bank/${bank.id}`}>افتح البنك <Icon name="arrow" size={17}/></a>
    </article>
  );
}

function SummaryPage() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [dialogLang, setDialogLang] = useState('ar');
  const dialogCopy = selectedChapter && (dialogLang === 'en' ? selectedChapter.en : selectedChapter);
  const detailCopy = selectedChapter && CHAPTER_VISUALS[selectedChapter.id]?.[dialogLang];
  const openChapter = ch => { setDialogLang('ar'); setSelectedChapter(ch); };

  useEffect(() => {
    if (!selectedChapter) return;
    const closeOnEscape = event => { if (event.key === 'Escape') setSelectedChapter(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedChapter]);

  return (
    <main className="summary-page">
      <div className="summary-wrap">
        <section className="summary-hero">
          <div className="summary-hero-copy">
            <span className="summary-kicker"><i/> خريطة مفاهيم · الفصول 1–9</span>
            <h1>كيف تعبر البيانات الشبكة؟</h1>
            <p>من تطبيق المصدر، عبر الطبقات والوسائط، إلى التطبيق المقابل — ثم تعود الإجابة بالطريق نفسه.</p>
            <nav className="chapter-index" aria-label="انتقل إلى فصل">
              {CHAPTERS.map(ch => <button key={ch.id} className={ch.id} type="button" onClick={() => openChapter(ch)}><b>{ch.n}</b><span>{ch.title}</span></button>)}
            </nav>
          </div>
          <div className="encapsulation-map" dir="ltr" aria-label="تغليف البيانات عبر طبقات TCP/IP">
            {[
              ['بيانات التطبيق', 'HTTP · DNS'], ['Segment / Datagram', 'TCP · UDP'], ['IP Packet', 'IPv4 · IPv6'], ['Frame', 'MAC'], ['Bits', 'وسط فيزيائي'],
            ].map(([title, sub], i) => <React.Fragment key={title}>
              <div className="encap-node"><small>{String(i + 1).padStart(2, '0')}</small><b>{title}</b><span>{sub}</span></div>
              {i < 4 && <span className="encap-arrow" aria-hidden="true">→</span>}
            </React.Fragment>)}
          </div>
          <div className="network-route" dir="ltr"><span>HOST</span><i/> <span>SWITCH</span><i/> <span>ROUTER</span><i/> <span>SWITCH</span><i/> <span>HOST</span><small>مسار الحزمة عبر الشبكات</small></div>
        </section>

        <section className="model-row" aria-label="رسم مقارنة نموذجي OSI وTCP/IP والعناوين">
          <div className="protocol-model-card">
            <div className="model-heading"><div><span>REFERENCE MODELS</span><h2>كيف تتوزّع وظائف الاتصال؟</h2><p>نموذج OSI يشرح الوظائف في 7 طبقات، ويجمعها TCP/IP في 4 طبقات عملية.</p></div><span className="model-mark">7 <i>↔</i> 4</span></div>
            <div className="layer-diagram" dir="ltr" aria-label="مقارنة طبقات OSI السبع بطبقات TCP/IP الأربع">
              <div className="layer-column osi-column">
                <h3>OSI <small>7 layers</small></h3>
                {['7 · Application','6 · Presentation','5 · Session','4 · Transport','3 · Network','2 · Data Link','1 · Physical'].map((label, i) => <div className={`osi-layer layer-tone-${i + 1}`} key={label}><b>{label.split(' · ')[0]}</b><span>{label.split(' · ')[1]}</span></div>)}
              </div>
              <div className="layer-mapping" aria-hidden="true"><span>↔</span><span>↔</span><span>↔</span><span>↔</span></div>
              <div className="layer-column tcp-column">
                <h3>TCP/IP <small>4 layers</small></h3>
                <div className="tcp-layer tcp-application"><b>Application</b><small>OSI 7 · 6 · 5</small><span>HTTP · DNS · DHCP</span></div>
                <div className="tcp-layer tcp-transport"><b>Transport</b><small>OSI 4</small><span>TCP · UDP</span></div>
                <div className="tcp-layer tcp-internet"><b>Internet</b><small>OSI 3</small><span>IP · ICMP</span></div>
                <div className="tcp-layer tcp-access"><b>Network Access</b><small>OSI 2 · 1</small><span>Ethernet · Wi‑Fi</span></div>
              </div>
            </div>
            <div className="model-takeaway"><b>الفكرة:</b> كل طبقة تقدّم خدمة لما فوقها، وتستفيد من الطبقة التي تحتها.</div>
          </div>
          <div className="address-model-card">
            <div className="address-head"><span className="model-mark">IP</span><div><b>نوع العنوان يحدّد مجال التسليم</b><small>عنوان منطقي عبر الشبكات، وعنوان محلي على الوصلة.</small></div></div>
            <div className="address-pills" dir="ltr"><div><b>IPv4</b><span>32 bit</span></div><div><b>IPv6</b><span>128 bit</span></div><div><b>MAC</b><span>48 bit</span></div></div>
            <div className="address-compare" dir="ltr"><span>IP · end-to-end</span><i>→</i><span>MAC · next hop</span></div>
            <p>يبقى IP الوجهة النهائية ثابتًا عبر المسار، بينما يتغيّر MAC من وصلة إلى أخرى.</p>
          </div>
        </section>

        <div className="summary-section-title"><div><span>الخريطة الكاملة</span><h2>تسعة فصول، فكرة واحدة مترابطة</h2></div><span className="summary-source">مراجعة مرئية سريعة · من الأساس إلى حل العناوين</span></div>
        <section className="chapter-grid" aria-label="ملخص الفصول التسعة">
          {CHAPTERS.map(ch => <article className={`chapter-card ${ch.id}`} id={ch.id} key={ch.id} role="button" tabIndex={0} aria-haspopup="dialog" aria-label={`افتح خلاصة ${ch.title}`} onClick={() => openChapter(ch)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openChapter(ch); } }}>
            <div className="chapter-card-head"><span className="chapter-number">{ch.n}</span><div><h3>{ch.title}</h3><p>{ch.focus}</p></div></div>
            <div className="chapter-flow" dir="ltr">{ch.flow.map((part, i) => <React.Fragment key={`${ch.id}-${part}`}><span>{part}</span>{i < ch.flow.length - 1 && <b>›</b>}</React.Fragment>)}</div>
            <ul>{ch.points.map(point => <li key={point}>{point}</li>)}</ul>
            <div className="chapter-tags">{ch.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <span className="chapter-open-hint">افتح خلاصة الفصل <Icon name="arrow" size={13}/></span>
          </article>)}
        </section>

        <section className="decision-strip" aria-label="قواعد تميّز بين الطبقات">
          <div className="decision-item decision-switch"><span className="decision-num">01</span><b>السويتش</b><small>يقرأ MAC الوجهة</small></div>
          <div className="decision-item decision-router"><span className="decision-num">02</span><b>الموجّه</b><small>يقرأ IP ويختار المسار</small></div>
          <div className="decision-item decision-arp"><span className="decision-num">03</span><b>ARP / ND</b><small>يجد MAC للعنوان المحلي</small></div>
          <div className="decision-item decision-physical"><span className="decision-num">04</span><b>الطبقة الفيزيائية</b><small>تنقل البتات كإشارة</small></div>
        </section>
        <footer className="footer summary-footer"><span>ملخص بصري للفصول 1–9</span><span className="credit">Built by <b>Yazeed Hamed</b></span></footer>
      </div>
      {selectedChapter && dialogCopy && <div className="chapter-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedChapter(null); }}>
        <section className={`chapter-dialog ${selectedChapter.id} ${dialogLang === 'en' ? 'dialog-english' : ''}`} role="dialog" aria-modal="true" aria-labelledby="chapter-dialog-title" dir={dialogLang === 'en' ? 'ltr' : 'rtl'} lang={dialogLang}>
          <div className="dialog-tools">
            <span className="dialog-kicker">{dialogLang === 'en' ? `CONCEPT SUMMARY · CHAPTER ${selectedChapter.n}` : `خلاصة المفهوم · الفصل ${selectedChapter.n}`}</span>
            <div className="dialog-language" role="group" aria-label={dialogLang === 'en' ? 'Summary language' : 'اختيار لغة الخلاصة'}>
              <Icon name="language" size={16}/>
              <button type="button" aria-pressed={dialogLang === 'ar'} onClick={() => setDialogLang('ar')}>العربية</button>
              <button type="button" aria-pressed={dialogLang === 'en'} onClick={() => setDialogLang('en')}>English</button>
            </div>
          </div>
          <button className="chapter-dialog-close" type="button" onClick={() => setSelectedChapter(null)} aria-label={dialogLang === 'en' ? 'Close summary' : 'إغلاق الخلاصة'}>×</button>
          <h2 id="chapter-dialog-title">{dialogCopy.title}</h2>
          <p className="dialog-focus">{dialogCopy.focus}</p>
          <div className="dialog-concept"><span><Icon name="spark" size={18}/></span><p>{dialogCopy.explanation}</p></div>
          <div className="dialog-flow" key={`${selectedChapter.id}-${dialogLang}`} dir="ltr" lang={dialogLang}>{dialogCopy.flow.map((item, i) => <React.Fragment key={`${dialogLang}-${i}-${item}`}><b>{item}</b>{i < dialogCopy.flow.length - 1 && <i>→</i>}</React.Fragment>)}</div>
          {detailCopy && <ChapterDetailVisuals chapterId={selectedChapter.id} lang={dialogLang}/>}
          <ul className="dialog-points">{dialogCopy.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className="dialog-tags">{dialogCopy.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <button className="dialog-done" type="button" onClick={() => setSelectedChapter(null)}>{dialogLang === 'en' ? 'Back to the chapter map' : 'فهمت، متابعة الخريطة'}</button>
        </section>
      </div>}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
